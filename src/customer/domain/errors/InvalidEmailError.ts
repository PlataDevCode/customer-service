import { DomainError } from './DomainError.js';

export class InvalidEmailError extends DomainError {
  constructor(value: string) {
    super(`Invalid email format: ${value}`);
  }
}
