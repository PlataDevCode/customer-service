import { Customer } from '../../../domain/entities/Customer.js';
import { CustomerNotFoundError } from '../../../domain/errors/CustomerNotFound.js';
import { CustomerRepository } from '../../../domain/repositories/CustomerRepository.js';
import { CustomerId, Money } from '../../../domain/value-objects/index.js';
import { AddCreditToCustomerDto } from './AddCreditToCustomerDto.js';

export class AddCreditToCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async execute(dto: AddCreditToCustomerDto): Promise<Customer> {
    const customerId = CustomerId.create(dto.customerId);
    const amount = new Money(dto.amount);

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId.toPrimitive());
    }

    customer.addCredit(amount);

    await this.customerRepository.save(customer);
    return customer;
  }
}
