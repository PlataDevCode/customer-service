import { CustomerNotFoundError } from '../../../domain/errors/CustomerNotFound.js';
import { CustomerRepository } from '../../../domain/repositories/CustomerRepository.js';
import { CustomerId } from '../../../domain/value-objects/index.js';
import { DeleteCustomerDto } from './DeleteCustomerDto.js';

export class DeleteCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async execute(dto: DeleteCustomerDto): Promise<void> {
    const customerId = CustomerId.create(dto.customerId);

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId.toPrimitive());
    }

    await this.customerRepository.deleteById(customerId);
  }
}
