import { createMockCustomerRepository } from '../../../../../test/mocks/CustomerRepositoryMock.js';
import { DeleteCustomerUseCase } from './DeleteCustomerUseCase.js';
import { DeleteCustomerError } from './DeleteCustomerError.js';
import { Customer } from '../../../domain/entities/Customer.js';
import { CustomerId, Email } from '../../../domain/value-objects/index.js';

describe('DeleteCustomerUseCase', () => {
  it('deletes an existing customer', async () => {
    const repository = createMockCustomerRepository();

    const customer = Customer.create(
      CustomerId.create(1),
      'Alex',
      Email.create('alex@test.com'),
    );

    repository.findById.mockResolvedValue(customer);

    const useCase = new DeleteCustomerUseCase(repository);

    await useCase.execute({ customerId: 1 });

    expect(repository.deleteById).toHaveBeenCalledTimes(1);
    expect(repository.deleteById).toHaveBeenCalledWith(CustomerId.create(1));
  });

  it('throws when customer does not exist', async () => {
    const repository = createMockCustomerRepository();
    repository.findById.mockResolvedValue(null);

    const useCase = new DeleteCustomerUseCase(repository);

    await expect(useCase.execute({ customerId: 1 })).rejects.toBeInstanceOf(
      DeleteCustomerError,
    );
  });
});
