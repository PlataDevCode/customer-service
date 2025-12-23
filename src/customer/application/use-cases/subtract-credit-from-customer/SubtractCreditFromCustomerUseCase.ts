import { Customer } from '../../../domain/entities/Customer.js';
import { CustomerNotFoundError } from '../../../domain/errors/CustomerNotFound.js';
import { CustomerRepository } from '../../../domain/repositories/CustomerRepository.js';
import { CustomerId, Money } from '../../../domain/value-objects/index.js';
import { SubtractCreditFromCustomerDto } from './SubtractCreditFromCustomerDto.js';
export class SubtractCreditFromCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async execute(dto: SubtractCreditFromCustomerDto): Promise<Customer> {
    const customerId = CustomerId.create(dto.customerId);
    const amount = new Money(dto.amount);

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId.toPrimitive());
    }

    customer.subtractCredit(amount);

    await this.customerRepository.save(customer);
    return customer;
  }
}
