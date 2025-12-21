import { Customer } from '../entities/Customer.js';
import { CustomerId } from '../value-objects/CustomerId.js';

export interface CustomerRepository {
  save(customer: Customer): Promise<void>;

  findById(id: CustomerId): Promise<Customer | null>;

  deleteById(id: CustomerId): Promise<void>;

  findAllSortedByAvailableCredit(order: 'asc' | 'desc'): Promise<Customer[]>;
}
