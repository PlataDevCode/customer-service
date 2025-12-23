import { DomainError } from './DomainError.js';

export class InvalidCustomerIdError extends DomainError {
  readonly statusCode = 400;
  readonly code = 'VALIDATION_ERROR';

  constructor(value: string) {
    super(`Invalid customer id: ${value}`);
  }
}
