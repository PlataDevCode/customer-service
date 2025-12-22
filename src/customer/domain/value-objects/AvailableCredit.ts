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
    if (!amount.isPositive())
      throw new Error('Amount to increase must positive.');
    const newBalance = this.balance.add(amount);
    return new AvailableCredit(newBalance);
  }

  public decrease(amount: Money) {
    if (!amount.isPositive())
      throw new Error('Amount to increase must positive.');
    if (amount.isGreaterThan(this.balance))
      throw new Error('Insufficient available credit.');
    const newBalance = this.balance.subtract(amount);
    return new AvailableCredit(newBalance);
  }
}
