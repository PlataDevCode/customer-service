import { Customer } from '../entities/Customer.js';
import { Money, CustomerId, Email } from '../value-objects/index.js';

describe('Customer Aggregate - credit behavior', () => {
  it('adds credit to customer', () => {
    const customer = Customer.create(
      CustomerId.create('customer-1'),
      'Alex',
      Email.create('alex@test.com'),
    );

    customer.addCredit(new Money(100));

    expect(customer.availableCredit.value.equals(new Money(100))).toBe(true);
  });

  it('accumulates credit when adding multiple times', () => {
    const customer = Customer.create(
      CustomerId.create('customer-1'),
      'Alex',
      Email.create('alex@test.com'),
    );

    customer.addCredit(new Money(50));
    customer.addCredit(new Money(30));

    expect(customer.availableCredit.value.equals(new Money(80))).toBe(true);
  });

  it('subtracts credit from customer', () => {
    const customer = Customer.create(
      CustomerId.create('customer-1'),
      'Alex',
      Email.create('alex@test.com'),
    );

    customer.addCredit(new Money(100));
    customer.subtractCredit(new Money(40));

    expect(customer.availableCredit.value.equals(new Money(60))).toBe(true);
  });
});
