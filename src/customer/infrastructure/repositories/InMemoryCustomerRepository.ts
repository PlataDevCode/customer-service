import { Customer } from '../../domain/entities/Customer.js';
import { CustomerRepository } from '../../domain/repositories/CustomerRepository.js';
import { CustomerId } from '../../domain/value-objects/CustomerId.js';

export class InMemoryCustomerRepository implements CustomerRepository {
  private customers: Map<number, Customer> = new Map();

  async save(customer: Customer): Promise<void> {
    this.customers.set(customer.id.toPrimitive(), customer);
  }

  async findById(id: CustomerId): Promise<Customer | null> {
    return this.customers.get(id.toPrimitive()) ?? null;
  }

  async deleteById(id: CustomerId): Promise<void> {
    this.customers.delete(id.toPrimitive());
  }

  async findAllSortedByAvailableCredit(
    order: 'asc' | 'desc',
  ): Promise<Customer[]> {
    const customers = Array.from(this.customers.values());

    customers.sort((a, b) => {
      const aCredit = a.availableCredit.value.value;
      const bCredit = b.availableCredit.value.value;

      return order === 'asc' ? aCredit - bCredit : bCredit - aCredit;
    });

    return customers;
  }
}
