import { jest } from '@jest/globals';
import { createMockCustomerRepository } from '../../../../../test/mocks/CustomerRepositoryMock.js';
import { CreateCustomerUseCase } from './CreateCustomerUseCase.js';
import { CreateCustomerDto } from './CreateCustomerDto.js';
import { Customer } from '../../../domain/entities/Customer.js';
import { CustomerIdGenerator } from '../../ports/CustomerIdGenerator.js';
import { Email } from '../../../domain/value-objects/Email.js';
import { InvalidEmailError } from '../../../domain/errors/InvalidEmailError.js';
import { EmailAlreadyExistsError } from '../../../domain/errors/EmailAlreadyExistError.js';

describe('CreateCustomerUseCase', () => {
  it('creates and saves a customer', async () => {
    const repository = createMockCustomerRepository();

    const idGenerator: CustomerIdGenerator = {
      generate: jest.fn<() => string>().mockReturnValue('customer-1'),
    };

    const emailConflictPolicy = {
      ensureIsUnique: jest
        .fn<(email: Email) => Promise<void>>()
        .mockResolvedValue(undefined),
    };

    const useCase = new CreateCustomerUseCase(
      repository,
      idGenerator,
      emailConflictPolicy,
    );

    const dto: CreateCustomerDto = {
      name: 'Alex',
      email: 'alex@test.com',
    };

    await useCase.execute(dto);

    expect(emailConflictPolicy.ensureIsUnique).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledTimes(1);

    const savedCustomer = repository.save.mock.calls[0]![0];

    expect(savedCustomer).toBeInstanceOf(Customer);
    expect(savedCustomer.id.toPrimitive()).toBe('customer-1');
    expect(savedCustomer.availableCredit.value.isZero()).toBe(true);
  });

  it('throws when email is invalid', async () => {
    const repository = createMockCustomerRepository();

    const idGenerator: CustomerIdGenerator = {
      generate: jest.fn<() => string>().mockReturnValue('customer-1'),
    };

    const emailConflictPolicy = {
      ensureIsUnique: jest
        .fn<(email: Email) => Promise<void>>()
        .mockResolvedValue(undefined),
    };

    const useCase = new CreateCustomerUseCase(
      repository,
      idGenerator,
      emailConflictPolicy,
    );

    const dto: CreateCustomerDto = {
      name: 'Alex',
      email: 'invalid-email',
    };

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(
      InvalidEmailError,
    );
  });

  it('throws when email already exists', async () => {
    const repository = createMockCustomerRepository();

    const idGenerator: CustomerIdGenerator = {
      generate: jest.fn<() => string>().mockReturnValue('customer-1'),
    };

    const emailConflictPolicy = {
      ensureIsUnique: jest
        .fn<(email: Email) => Promise<void>>()
        .mockRejectedValue(new EmailAlreadyExistsError()),
    };

    const useCase = new CreateCustomerUseCase(
      repository,
      idGenerator,
      emailConflictPolicy,
    );

    const dto: CreateCustomerDto = {
      name: 'Alex',
      email: 'alex@test.com',
    };

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(
      EmailAlreadyExistsError,
    );
  });
});
