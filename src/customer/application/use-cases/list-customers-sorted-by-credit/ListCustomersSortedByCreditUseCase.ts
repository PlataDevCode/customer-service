import { CustomerRepository } from '../../../domain/repositories/CustomerRepository.js';
import { CustomerListItemDto } from './CustomerListItemDto.js';

export class ListCustomersSortedByCreditUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async execute(): Promise<CustomerListItemDto[]> {
    const customers =
      await this.customerRepository.findAllSortedByAvailableCredit('desc');

    return customers.map((customer) => ({
      id: customer.id.toPrimitive(),
      name: customer.name,
      email: customer.email.toString(),
      availableCredit: customer.availableCredit.toNumber(),
    }));
  }
}
