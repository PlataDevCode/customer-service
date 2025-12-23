import { jest } from '@jest/globals';
import { CustomerRepository } from '../../src/customer/domain/repositories/CustomerRepository.js';
import { Customer } from '../../src/customer/domain/entities/Customer.js';

export function createMockCustomerRepository(): jest.Mocked<CustomerRepository> {
  return {
    save: jest.fn(async (_customer: Customer): Promise<void> => {}),
    findById: jest.fn(),
    deleteById: jest.fn(),
    findAllSortedByAvailableCredit: jest.fn(),
    findByEmail: jest.fn(),
  };
}
