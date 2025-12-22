import { CustomerRepository } from '../../../domain/repositories/CustomerRepository.js';
import { CustomerId, Money } from '../../../domain/value-objects/index.js';
import { SubtractCreditFromCustomerDto } from './SubtractCreditFromCustomerDto.js';
import { SubtractCreditFromCustomerError } from './SubtractCreditFromCustomerError.js';

export class SubtractCreditFromCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async execute(dto: SubtractCreditFromCustomerDto): Promise<void> {
    const customerId = CustomerId.create(dto.customerId);
    const amount = new Money(dto.amount);

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new SubtractCreditFromCustomerError('Customer not found');
    }

    customer.subtractCredit(amount);

    await this.customerRepository.save(customer);
  }
}
