import { CustomerRepository } from '../../../domain/repositories/CustomerRepository.js';
import { CustomerId } from '../../../domain/value-objects/index.js';
import { GetCustomerByIdDto } from './GetCustomerByIdDto.js';
import { GetCustomerByIdError } from './GetCustomerByIdError.js';
import { Customer } from '../../../domain/entities/Customer.js';

export class GetCustomerByIdUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async execute(dto: GetCustomerByIdDto): Promise<Customer> {
    const customerId = CustomerId.create(dto.customerId);

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new GetCustomerByIdError('Customer not found');
    }

    return customer;
  }
}
