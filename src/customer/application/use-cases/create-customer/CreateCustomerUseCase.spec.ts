import { createMockCustomerRepository } from '../../../../../test/mocks/CustomerRepositoryMock.js';
import { CreateCustomerUseCase } from './CreateCustomerUseCase.js';
import { CreateCustomerDto } from './CreateCustomerDto.js';
import { Customer } from '../../../domain/entities/Customer.js';

describe('CreateCustomerUseCase', () => {
  it('creates and saves a customer', async () => {
    const repository = createMockCustomerRepository();
    const useCase = new CreateCustomerUseCase(repository);

    const dto: CreateCustomerDto = {
      customerId: 1,
      name: 'Alex',
      email: 'alex@test.com',
    };

    await useCase.execute(dto);

    expect(repository.save).toHaveBeenCalledTimes(1);

    const savedCustomer = repository.save.mock.calls[0]![0];

    expect(savedCustomer).toBeInstanceOf(Customer);
    expect(savedCustomer.availableCredit.value.isZero()).toBe(true);
  });

  it('throws when email is invalid', async () => {
    const repository = createMockCustomerRepository();
    const useCase = new CreateCustomerUseCase(repository);

    const dto: CreateCustomerDto = {
      customerId: 1,
      name: 'Alex',
      email: 'invalid-email',
    };

    await expect(useCase.execute(dto)).rejects.toThrow();
  });
});
