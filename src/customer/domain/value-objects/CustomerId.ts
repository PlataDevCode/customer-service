import { InvalidCustomerIdError } from '../errors/InvalidCusomerIdError.js';

export class CustomerId {
  private constructor(private readonly value: string) {
    this.ensureIsValid(value);
  }

  static create(value: string): CustomerId {
    return new CustomerId(value);
  }

  equals(other: CustomerId): boolean {
    return this.value === other.value;
  }

  toPrimitive(): string {
    return this.value;
  }

  private ensureIsValid(value: string): void {
    if (!value || typeof value !== 'string' || value.trim().length === 0) {
      throw new InvalidCustomerIdError(value);
    }
  }
}
