import { Email } from '../../domain/value-objects/Email.js';

export interface EmailUniquenessPolicy {
  ensureIsUnique(email: Email): Promise<void>;
}
