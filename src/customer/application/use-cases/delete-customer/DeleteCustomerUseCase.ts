import { CustomerRepository } from '../../../domain/repositories/CustomerRepository.js';
import { CustomerId } from '../../../domain/value-objects/index.js';
import { DeleteCustomerDto } from './DeleteCustomerDto.js';
import { DeleteCustomerError } from './DeleteCustomerError.js';

export class DeleteCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async execute(dto: DeleteCustomerDto): Promise<void> {
    const customerId = CustomerId.create(dto.customerId);

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new DeleteCustomerError('Customer not found');
    }

    await this.customerRepository.deleteById(customerId);
  }
}
