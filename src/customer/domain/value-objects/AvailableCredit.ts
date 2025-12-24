import { InsufficientCreditError } from '../errors/InsufficientCreditError.js';
import { Money } from './Money.js';

export class AvailableCredit {
  private balance: Money;

  private constructor(balance: Money) {
    this.balance = balance;
  }

  public get value(): Money {
    return this.balance;
  }

  public toNumber(): number {
    return this.balance.value;
  }

  public static zero(): AvailableCredit {
    return new AvailableCredit(Money.zero());
  }

  public increase(amount: Money): AvailableCredit {
    if (amount.isZero()) return this;
    const newBalance = this.balance.add(amount);
    return new AvailableCredit(newBalance);
  }

  public decrease(amount: Money): AvailableCredit {
    if (amount.isZero()) return this;
    if (amount.isGreaterThan(this.balance)) throw new InsufficientCreditError();
    return new AvailableCredit(this.balance.subtract(amount));
  }

  public static from(amount: number): AvailableCredit {
    return new AvailableCredit(Money.from(amount));
  }
}
