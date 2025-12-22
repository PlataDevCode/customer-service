import { InsufficientCreditError } from '../errors/InsufficientCreditError.js';
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

  it('throws InsufficientCreditError when decreasing more than available', () => {
    const credit = AvailableCredit.zero();

    expect(() => credit.decrease(new Money(10))).toThrow(
      InsufficientCreditError,
    );
  });

  it('allows decreasing credit when enough balance exists', () => {
    const credit = AvailableCredit.zero()
      .increase(new Money(100))
      .decrease(new Money(40));

    expect(credit.value.equals(new Money(60))).toBe(true);
  });

  it('does nothing when increasing or decreasing zero', () => {
    const credit = AvailableCredit.zero();

    const increased = credit.increase(Money.zero());
    const decreased = credit.decrease(Money.zero());

    expect(increased.value.equals(credit.value)).toBe(true);
    expect(decreased.value.equals(credit.value)).toBe(true);
  });
});
