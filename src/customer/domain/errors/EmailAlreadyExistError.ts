import { DomainError } from './DomainError.js';

export class EmailAlreadyExistsError extends DomainError {
  readonly statusCode = 409;
  readonly code = 'CONFLICT';

  constructor() {
    super('Email already exists');
  }
}
