import { InvalidCustomerIdError } from '../errors/InvalidCusomerIdError.js';
import { CustomerId } from '../value-objects/CustomerId.js';

describe('CustomerId Value Object', () => {
  it('creates valid customer id', () => {
    const id = CustomerId.create('customer-1');

    expect(id.toPrimitive()).toBe('customer-1');
  });

  it('throws InvalidCustomerIdError for invalid id', () => {
    expect(() => CustomerId.create('')).toThrow(InvalidCustomerIdError);

    expect(() => CustomerId.create(null as unknown as string)).toThrow(
      InvalidCustomerIdError,
    );

    expect(() => CustomerId.create(undefined as unknown as string)).toThrow(
      InvalidCustomerIdError,
    );

    expect(() => CustomerId.create(123 as unknown as string)).toThrow(
      InvalidCustomerIdError,
    );
  });

  it('compares equality by value', () => {
    const id1 = CustomerId.create('customer-5');
    const id2 = CustomerId.create('customer-5');

    expect(id1.equals(id2)).toBe(true);
  });
});
