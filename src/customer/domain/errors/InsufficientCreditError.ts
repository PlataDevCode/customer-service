import { DomainError } from './DomainError.js';

export class InsufficientCreditError extends DomainError {
  readonly statusCode = 409;
  readonly code = 'CONFLICT';

  constructor() {
    super('Insufficient available credit');
  }
}
