import { Money } from '../value-objects/Money.js';

describe('Money Value Object', () => {
  it('creates money with positive amount', () => {
    const money = new Money(100);
    expect(money.isPositive()).toBe(true);
  });

  it('throws error when amount is negative', () => {
    expect(() => new Money(-10)).toThrow();
  });

  it('adds money correctly', () => {
    const result = new Money(50).add(new Money(30));
    expect(result.equals(new Money(80))).toBe(true);
  });

  it('subtracts money correctly', () => {
    const result = new Money(100).subtract(new Money(40));
    expect(result.equals(new Money(60))).toBe(true);
  });
});
