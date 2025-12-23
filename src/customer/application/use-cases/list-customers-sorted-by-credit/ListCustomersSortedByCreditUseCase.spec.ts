import { createMockCustomerRepository } from '../../../../../test/mocks/CustomerRepositoryMock.js';
import { ListCustomersSortedByCreditUseCase } from './ListCustomersSortedByCreditUseCase.js';
import { Customer } from '../../../domain/entities/Customer.js';
import {
  CustomerId,
  Email,
  Money,
} from '../../../domain/value-objects/index.js';

describe('ListCustomersSortedByCreditUseCase', () => {
  it('returns customers sorted by available credit', async () => {
    const repository = createMockCustomerRepository();

    const customer1 = Customer.create(
      CustomerId.create('customer-1'),
      'Alex',
      Email.create('alex@test.com'),
    );
    customer1.addCredit(new Money(100));

    const customer2 = Customer.create(
      CustomerId.create('customer-2'),
      'Bob',
      Email.create('bob@test.com'),
    );
    customer2.addCredit(new Money(50));

    repository.findAllSortedByAvailableCredit.mockResolvedValue([
      customer1,
      customer2,
    ]);

    const useCase = new ListCustomersSortedByCreditUseCase(repository);

    const result = await useCase.execute('desc');

    expect(repository.findAllSortedByAvailableCredit).toHaveBeenCalledWith(
      'desc',
    );

    expect(result).toEqual([
      {
        id: 'customer-1',
        name: 'Alex',
        email: 'alex@test.com',
        availableCredit: 100,
      },
      {
        id: 'customer-2',
        name: 'Bob',
        email: 'bob@test.com',
        availableCredit: 50,
      },
    ]);
  });

  it('supports asc order', async () => {
    const repository = createMockCustomerRepository();

    const customer1 = Customer.create(
      CustomerId.create('customer-1'),
      'Alex',
      Email.create('alex@test.com'),
    );
    customer1.addCredit(new Money(100));

    const customer2 = Customer.create(
      CustomerId.create('customer-2'),
      'Bob',
      Email.create('bob@test.com'),
    );
    customer2.addCredit(new Money(50));

    repository.findAllSortedByAvailableCredit.mockResolvedValue([
      customer2,
      customer1,
    ]);

    const useCase = new ListCustomersSortedByCreditUseCase(repository);

    const result = await useCase.execute('asc');

    expect(repository.findAllSortedByAvailableCredit).toHaveBeenCalledWith(
      'asc',
    );

    expect(result[0]!.id).toBe('customer-2');
    expect(result[1]!.id).toBe('customer-1');
  });
});
