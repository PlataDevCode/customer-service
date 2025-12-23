import { EmailAlreadyExistsError } from '../../domain/errors/EmailAlreadyExistError.js';
import { CustomerRepository } from '../../domain/repositories/CustomerRepository.js';
import { Email } from '../../domain/value-objects/Email.js';
import { EmailUniquenessPolicy } from '../ports/EmailUniquenessPolicy.js';

export class EmailConflictPolicy implements EmailUniquenessPolicy {
  constructor(private readonly repository: CustomerRepository) {}

  public async ensureIsUnique(email: Email): Promise<void> {
    const existing = await this.repository.findByEmail(email);
    if (existing) {
      throw new EmailAlreadyExistsError();
    }
  }
}
