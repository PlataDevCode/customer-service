import { createMockCustomerRepository } from '../../../../../test/mocks/CustomerRepositoryMock.js';
import { AddCreditToCustomerUseCase } from './AddCreditToCustomerUseCase.js';
import { AddCreditToCustomerError } from './AddCreditToCustomerError.js';
import { Customer } from '../../../domain/entities/Customer.js';
import { CustomerId, Email } from '../../../domain/value-objects/index.js';

describe('AddCreditToCustomerUseCase', () => {
  it('adds credit to an existing customer', async () => {
    const repository = createMockCustomerRepository();

    const customer = Customer.create(
      CustomerId.create(1),
      'Alex',
      Email.create('alex@test.com'),
    );

    repository.findById.mockResolvedValue(customer);

    const useCase = new AddCreditToCustomerUseCase(repository);

    await useCase.execute({ customerId: 1, amount: 100 });

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(customer.availableCredit.toNumber()).toBe(100);
  });

  it('throws when customer does not exist', async () => {
    const repository = createMockCustomerRepository();
    repository.findById.mockResolvedValue(null);

    const useCase = new AddCreditToCustomerUseCase(repository);

    await expect(
      useCase.execute({ customerId: 1, amount: 100 }),
    ).rejects.toBeInstanceOf(AddCreditToCustomerError);
  });

  it('throws when amount is invalid', async () => {
    const repository = createMockCustomerRepository();

    const customer = Customer.create(
      CustomerId.create(1),
      'Alex',
      Email.create('alex@test.com'),
    );

    repository.findById.mockResolvedValue(customer);

    const useCase = new AddCreditToCustomerUseCase(repository);

    await expect(
      useCase.execute({ customerId: 1, amount: -10 }),
    ).rejects.toThrow('Money amount cannot be negative');
  });
});
