import { CustomerRepository } from '../../../domain/repositories/CustomerRepository.js';
import { CustomerId, Money } from '../../../domain/value-objects/index.js';
import { AddCreditToCustomerDto } from './AddCreditToCustomerDto.js';
import { AddCreditToCustomerError } from './AddCreditToCustomerError.js';

export class AddCreditToCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async execute(dto: AddCreditToCustomerDto): Promise<void> {
    const customerId = CustomerId.create(dto.customerId);
    const amount = new Money(dto.amount);

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new AddCreditToCustomerError('Customer not found');
    }

    customer.addCredit(amount);

    await this.customerRepository.save(customer);
  }
}
