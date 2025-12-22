import { InvalidEmailError } from '../errors/InvalidEmailError.js';
import { Email } from '../value-objects/Email.js';

describe('Email Value Object', () => {
  it('normalizes email to lowercase and trims spaces', () => {
    const email = Email.create('  Alex@Email.COM ');
    expect(email.toString()).toBe('alex@email.com');
  });

  it('considers two equivalent emails as equal', () => {
    const email1 = Email.create('alex@email.com');
    const email2 = Email.create('ALEX@EMAIL.COM');

    expect(email1.equals(email2)).toBe(true);
  });

  it('throws InvalidEmailError for invalid email format', () => {
    expect(() => Email.create('invalid-email')).toThrow(InvalidEmailError);
    expect(() => Email.create('')).toThrow(InvalidEmailError);
    expect(() => Email.create('   ')).toThrow(InvalidEmailError);
  });
});
