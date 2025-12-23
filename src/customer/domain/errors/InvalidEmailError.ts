import { DomainError } from './DomainError.js';

export class InvalidEmailError extends DomainError {
  readonly statusCode = 400;
  readonly code = 'VALIDATION_ERROR';

  constructor(value: string) {
    super(`Invalid email format: ${value}`);
  }
}
