import { DomainError } from './DomainError.js';

export class CustomerNotFoundError extends DomainError {
  readonly statusCode = 404;
  readonly code = 'NOT_FOUND';

  constructor(customerId: string) {
    super(`Customer with id ${customerId} not found`);
  }
}
