import { CustomerId } from '../value-objects/CustomerId.js';

describe('CustomerId Value Object', () => {
  it('creates valid customer id', () => {
    const id = CustomerId.create(1);
    expect(id.toPrimitive()).toBe(1);
  });

  it('throws error for invalid id', () => {
    expect(() => CustomerId.create(0)).toThrow();
    expect(() => CustomerId.create(-1)).toThrow();
  });

  it('compares equality by value', () => {
    const id1 = CustomerId.create(5);
    const id2 = CustomerId.create(5);

    expect(id1.equals(id2)).toBe(true);
  });
});
