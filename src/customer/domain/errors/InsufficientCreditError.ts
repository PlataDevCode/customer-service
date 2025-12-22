import { DomainError } from './DomainError.js';

export class InsufficientCreditError extends DomainError {
  constructor() {
    super('Insufficient available credit');
  }
}
