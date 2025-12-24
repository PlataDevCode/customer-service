import {
  PutCommand,
  GetCommand,
  DeleteCommand,
  ScanCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';

import { dynamo } from '../../../shared/persistence/dynamodb/dynamo-client.js';

import { CustomerRepository } from '../../domain/repositories/CustomerRepository.js';
import { Customer } from '../../domain/entities/Customer.js';
import { CustomerId } from '../../domain/value-objects/CustomerId.js';
import { Email } from '../../domain/value-objects/Email.js';

type CustomerPrimitives = {
  id: string;
  name: string;
  email: string;
  availableCredit: number;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export class DynamoDbCustomerRepository implements CustomerRepository {
  private readonly tableName = process.env.CUSTOMERS_TABLE_NAME!;

  async save(customer: Customer): Promise<void> {
    await dynamo.send(
      new PutCommand({
        TableName: this.tableName,
        Item: customer.toPrimitives(),
      }),
    );
  }

  async findById(id: CustomerId): Promise<Customer | null> {
    const result = await dynamo.send(
      new GetCommand({
        TableName: this.tableName,
        Key: {
          id: id.toPrimitive(),
        },
      }),
    );

    return result.Item
      ? Customer.fromPrimitives(result.Item as CustomerPrimitives)
      : null;
  }

  async findByEmail(email: Email): Promise<Customer | null> {
    const result = await dynamo.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': email.toString(),
        },
        Limit: 1,
      }),
    );

    return result.Items && result.Items.length > 0
      ? Customer.fromPrimitives(result.Items[0] as CustomerPrimitives)
      : null;
  }

  async deleteById(id: CustomerId): Promise<void> {
    await dynamo.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: {
          id: id.toPrimitive(),
        },
      }),
    );
  }

  async findAllSortedByAvailableCredit(
    order: 'asc' | 'desc',
  ): Promise<Customer[]> {
    const result = await dynamo.send(
      new ScanCommand({
        TableName: this.tableName,
      }),
    );

    const customers = (result.Items ?? []).map((item) =>
      Customer.fromPrimitives(item as CustomerPrimitives),
    );

    return customers.sort((a, b) =>
      order === 'asc'
        ? a.availableCredit.toNumber() - b.availableCredit.toNumber()
        : b.availableCredit.toNumber() - a.availableCredit.toNumber(),
    );
  }
}
