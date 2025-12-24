import { InvalidMoneyAmountError } from '../errors/InvalidMoneyAmountError.js';

export class Money {
  private readonly amount: number;
  constructor(amount: number) {
    if (typeof amount !== 'number' || Number.isNaN(amount)) {
      throw new InvalidMoneyAmountError(amount);
    }

    if (amount < 0) {
      throw new InvalidMoneyAmountError(amount);
    }
    this.amount = amount;
  }

  public get value(): number {
    return this.amount;
  }

  public add(other: Money): Money {
    return new Money(this.amount + other.amount);
  }

  public subtract(other: Money): Money {
    return new Money(this.amount - other.amount);
  }

  public equals(other: Money): boolean {
    return this.amount === other.amount;
  }

  public isGreaterThan(other: Money): boolean {
    return this.amount > other.amount;
  }

  public isLessThan(other: Money): boolean {
    return this.amount < other.amount;
  }

  public isZero(): boolean {
    return this.amount === 0;
  }

  public isPositive(): boolean {
    return this.amount > 0;
  }

  public static zero(): Money {
    return new Money(0);
  }

  public static from(amount: number): Money {
    return new Money(amount);
  }
}
