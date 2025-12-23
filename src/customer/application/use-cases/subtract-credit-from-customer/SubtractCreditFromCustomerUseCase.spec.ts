import { createMockCustomerRepository } from '../../../../../test/mocks/CustomerRepositoryMock.js';
import { SubtractCreditFromCustomerUseCase } from './SubtractCreditFromCustomerUseCase.js';
import { Customer } from '../../../domain/entities/Customer.js';
import {
  CustomerId,
  Email,
  Money,
} from '../../../domain/value-objects/index.js';
import { InsufficientCreditError } from '../../../domain/errors/InsufficientCreditError.js';
import { CustomerNotFoundError } from '../../../domain/errors/CustomerNotFound.js';

describe('SubtractCreditFromCustomerUseCase', () => {
  it('subtracts credit from an existing customer', async () => {
    const repository = createMockCustomerRepository();

    const customer = Customer.create(
      CustomerId.create('customer-1'),
      'Alex',
      Email.create('alex@test.com'),
    );
    customer.addCredit(new Money(100));

    repository.findById.mockResolvedValue(customer);

    const useCase = new SubtractCreditFromCustomerUseCase(repository);

    await useCase.execute({ customerId: 'customer-1', amount: 40 });

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(customer.availableCredit.toNumber()).toBe(60);
  });

  it('throws when customer does not exist', async () => {
    const repository = createMockCustomerRepository();
    repository.findById.mockResolvedValue(null);

    const useCase = new SubtractCreditFromCustomerUseCase(repository);

    await expect(
      useCase.execute({ customerId: 'customer-1', amount: 10 }),
    ).rejects.toBeInstanceOf(CustomerNotFoundError);
  });

  it('throws when trying to subtract more credit than available', async () => {
    const repository = createMockCustomerRepository();

    const customer = Customer.create(
      CustomerId.create('customer-1'),
      'Alex',
      Email.create('alex@test.com'),
    );
    customer.addCredit(new Money(30));

    repository.findById.mockResolvedValue(customer);

    const useCase = new SubtractCreditFromCustomerUseCase(repository);

    await expect(
      useCase.execute({ customerId: 'customer-1', amount: 50 }),
    ).rejects.toBeInstanceOf(InsufficientCreditError);
  });
});
