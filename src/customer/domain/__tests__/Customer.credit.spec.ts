import { Customer } from '../entities/Customer.js';
import { Money } from '../value-objects/Money.js';

describe('Customer credit behavior', () => {
  it('adds credit to customer available credit', () => {
    const customer = Customer.create(1, 'Alex', 'alex@test.com');

    customer.addCredit(new Money(100));

    expect(customer.availableCredit.value.equals(new Money(100))).toBe(true);
  });

  it('accumulates credit when adding multiple times', () => {
    const customer = Customer.create(1, 'Alex', 'alex@test.com');

    customer.addCredit(new Money(50));
    customer.addCredit(new Money(30));

    expect(customer.availableCredit.value.equals(new Money(80))).toBe(true);
  });

  it('subtracts credit from customer available credit', () => {
    const customer = Customer.create(1, 'Alex', 'alex@test.com');

    customer.addCredit(new Money(100));
    customer.subtractCredit(new Money(40));

    expect(customer.availableCredit.value.equals(new Money(60))).toBe(true);
  });
});
