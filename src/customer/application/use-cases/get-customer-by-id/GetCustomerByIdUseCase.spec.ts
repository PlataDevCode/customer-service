import { createMockCustomerRepository } from '../../../../../test/mocks/CustomerRepositoryMock.js';
import { GetCustomerByIdUseCase } from './GetCustomerByIdUseCase.js';
import { GetCustomerByIdError } from './GetCustomerByIdError.js';
import { Customer } from '../../../domain/entities/Customer.js';
import { CustomerId, Email } from '../../../domain/value-objects/index.js';

describe('GetCustomerByIdUseCase', () => {
  it('returns a customer when found', async () => {
    const repository = createMockCustomerRepository();

    const customer = Customer.create(
      CustomerId.create(1),
      'Alex',
      Email.create('alex@test.com'),
    );

    repository.findById.mockResolvedValue(customer);

    const useCase = new GetCustomerByIdUseCase(repository);

    const result = await useCase.execute({ customerId: 1 });

    expect(result).toBe(customer);
    expect(repository.findById).toHaveBeenCalledTimes(1);
  });

  it('throws GetCustomerByIdError when customer does not exist', async () => {
    const repository = createMockCustomerRepository();
    repository.findById.mockResolvedValue(null);

    const useCase = new GetCustomerByIdUseCase(repository);

    await expect(useCase.execute({ customerId: 1 })).rejects.toBeInstanceOf(
      GetCustomerByIdError,
    );
  });

  it('throws when customerId is invalid', async () => {
    const repository = createMockCustomerRepository();
    const useCase = new GetCustomerByIdUseCase(repository);

    await expect(useCase.execute({ customerId: -1 })).rejects.toThrow();
  });
});
