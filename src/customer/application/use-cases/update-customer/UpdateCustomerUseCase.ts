import { CustomerRepository } from '../../../domain/repositories/CustomerRepository.js';
import { CustomerId } from '../../../domain/value-objects/index.js';
import { UpdateCustomerDto } from './UpdateCustomerDto.js';
import { UpdateCustomerError } from './UpdateCustomerError.js';

export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async execute(dto: UpdateCustomerDto): Promise<void> {
    const customerId = CustomerId.create(dto.customerId);

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new UpdateCustomerError('Customer not found');
    }

    if (dto.name !== undefined) {
      customer.updateName(dto.name);
    }

    if (dto.email !== undefined) {
      customer.updateEmail(dto.email);
    }

    await this.customerRepository.save(customer);
  }
}
