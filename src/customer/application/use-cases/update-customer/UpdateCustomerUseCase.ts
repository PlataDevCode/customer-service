import { Customer } from '../../../domain/entities/Customer.js';
import { CustomerNotFoundError } from '../../../domain/errors/CustomerNotFound.js';
import { CustomerRepository } from '../../../domain/repositories/CustomerRepository.js';
import { CustomerId } from '../../../domain/value-objects/index.js';
import { UpdateCustomerDto } from './UpdateCustomerDto.js';

export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async execute(dto: UpdateCustomerDto): Promise<Customer> {
    const customerId = CustomerId.create(dto.customerId);

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId.toPrimitive());
    }

    if (dto.name !== undefined) {
      customer.updateName(dto.name);
    }

    if (dto.email !== undefined) {
      customer.updateEmail(dto.email);
    }

    await this.customerRepository.save(customer);
    return customer;
  }
}
