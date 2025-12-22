import { InvalidCustomerIdError } from '../errors/InvalidCusomerIdError.js';

export class CustomerId {
  private constructor(private readonly value: number) {
    this.ensureIsValid(value);
  }

  public static create(value: number): CustomerId {
    return new CustomerId(value);
  }

  public equals(other: CustomerId): boolean {
    return this.value === other.value;
  }

  public toPrimitive(): number {
    return this.value;
  }

  private ensureIsValid(value: number): void {
    if (Number.isNaN(value) || !Number.isInteger(value) || value <= 0) {
      throw new InvalidCustomerIdError(value);
    }
  }
}
