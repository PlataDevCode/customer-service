import { DynamoDbCustomerRepository } from '../src/customer/infrastructure/repositories/DynamoDbCustomerRepository.js';
import { Customer } from '../src/customer/domain/entities/Customer.js';
import { CustomerId } from '../src/customer/domain/value-objects/CustomerId.js';
import { Email } from '../src/customer/domain/value-objects/Email.js';
import { Money } from '../src/customer/domain/value-objects/Money.js';

async function seed() {
  console.log('Seeding DynamoDB customers...');

  const repository = new DynamoDbCustomerRepository();

  const customer1 = Customer.create(
    CustomerId.create('seed-1'),
    'Seed User One',
    Email.create('seed1@test.com'),
  );

  const customer2 = Customer.create(
    CustomerId.create('seed-2'),
    'Seed User Two',
    Email.create('seed2@test.com'),
  );

  // opcional: agregar crédito
  customer1.addCredit(new Money(100));
  customer2.addCredit(new Money(250));

  const customers = [customer1, customer2];

  for (const customer of customers) {
    await repository.save(customer);
    console.log(`Inserted ${customer.email.toString()}`);
  }

  console.log('Seed completed');
}

seed().catch((err) => {
  console.error('Seed failed');
  console.error(err);
  process.exit(1);
});
