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

    const result = await useCase.execute();

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
});
