import { DomainError } from './DomainError.js';

export class InvalidMoneyAmountError extends DomainError {
  readonly statusCode = 400;
  readonly code = 'INVALID_MONEY_AMOUNT';

  constructor(value: unknown) {
    super(`Invalid money amount: ${String(value)}`);
  }
}
