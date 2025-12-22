import { createMockCustomerRepository } from '../../../../../test/mocks/CustomerRepositoryMock.js';
import { UpdateCustomerUseCase } from './UpdateCustomerUseCase.js';
import { UpdateCustomerError } from './UpdateCustomerError.js';
import { Customer } from '../../../domain/entities/Customer.js';
import { CustomerId, Email } from '../../../domain/value-objects/index.js';

describe('UpdateCustomerUseCase', () => {
  it('updates customer name', async () => {
    const repository = createMockCustomerRepository();

    const customer = Customer.create(
      CustomerId.create(1),
      'Alex',
      Email.create('alex@test.com'),
    );

    repository.findById.mockResolvedValue(customer);

    const useCase = new UpdateCustomerUseCase(repository);

    await useCase.execute({
      customerId: 1,
      name: 'Alexander',
    });

    expect(customer.name).toBe('Alexander');
    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it('updates customer email', async () => {
    const repository = createMockCustomerRepository();

    const customer = Customer.create(
      CustomerId.create(1),
      'Alex',
      Email.create('alex@test.com'),
    );

    repository.findById.mockResolvedValue(customer);

    const useCase = new UpdateCustomerUseCase(repository);

    await useCase.execute({
      customerId: 1,
      email: 'new@test.com',
    });

    expect(customer.email.toString()).toBe('new@test.com');
  });

  it('throws when customer does not exist', async () => {
    const repository = createMockCustomerRepository();
    repository.findById.mockResolvedValue(null);

    const useCase = new UpdateCustomerUseCase(repository);

    await expect(
      useCase.execute({ customerId: 1, name: 'X' }),
    ).rejects.toBeInstanceOf(UpdateCustomerError);
  });
});
