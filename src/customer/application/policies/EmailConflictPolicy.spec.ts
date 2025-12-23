import { EmailConflictPolicy } from './EmailConflictPolicy.js';
import { Email } from '../../domain/value-objects/Email.js';
import { Customer } from '../../domain/entities/Customer.js';
import { CustomerId } from '../../domain/value-objects/CustomerId.js';
import { createMockCustomerRepository } from '../../../../test/mocks/CustomerRepositoryMock.js';

describe('EmailConflictPolicy', () => {
  it('does nothing when email is unique', async () => {
    const repository = createMockCustomerRepository();
    repository.findByEmail.mockResolvedValue(null);

    const policy = new EmailConflictPolicy(repository);

    const email = Email.create('unique@test.com');

    await expect(policy.ensureIsUnique(email)).resolves.not.toThrow();

    expect(repository.findByEmail).toHaveBeenCalledWith(email);
  });

  it('throws when email already exists', async () => {
    const repository = createMockCustomerRepository();

    const existingCustomer = Customer.create(
      CustomerId.create('customer-1'),
      'Alex',
      Email.create('alex@test.com'),
    );

    repository.findByEmail.mockResolvedValue(existingCustomer);

    const policy = new EmailConflictPolicy(repository);

    const email = Email.create('alex@test.com');

    await expect(policy.ensureIsUnique(email)).rejects.toThrow(
      'Email already exists',
    );
  });
});
