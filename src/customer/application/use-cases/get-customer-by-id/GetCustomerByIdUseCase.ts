import { CustomerRepository } from '../../../domain/repositories/CustomerRepository.js';
import { CustomerId } from '../../../domain/value-objects/index.js';
import { GetCustomerByIdDto } from './GetCustomerByIdDto.js';
import { Customer } from '../../../domain/entities/Customer.js';
import { CustomerNotFoundError } from '../../../domain/errors/CustomerNotFound.js';

export class GetCustomerByIdUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async execute(dto: GetCustomerByIdDto): Promise<Customer> {
    const customerId = CustomerId.create(dto.customerId);

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId.toPrimitive());
    }

    return customer;
  }
}
