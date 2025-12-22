import { DomainError } from './DomainError.js';

export class InvalidCustomerIdError extends DomainError {
  constructor(value: number) {
    super(`Invalid customer id: ${value}`);
  }
}
