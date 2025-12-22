import { DomainError } from './DomainError.js';

export class InvalidCustomerIdError extends DomainError {
  constructor(value: string) {
    super(`Invalid customer id: ${value}`);
  }
}
