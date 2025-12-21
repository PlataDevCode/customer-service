import { AvailableCredit } from '../value-objects/AvailableCredit.js';
import { Money } from '../value-objects/Money.js';

describe('AvailableCredit Value Object', () => {
  it('starts with zero credit', () => {
    const credit = AvailableCredit.zero();
    expect(credit.value.isZero()).toBe(true);
  });

  it('increases credit correctly', () => {
    const credit = AvailableCredit.zero().increase(new Money(100));
    expect(credit.value.equals(new Money(100))).toBe(true);
  });

  it('throws error when decreasing more than available', () => {
    const credit = AvailableCredit.zero();

    expect(() => credit.decrease(new Money(10))).toThrow();
  });
});
