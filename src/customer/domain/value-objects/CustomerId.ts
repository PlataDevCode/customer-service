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
    if (Number.isNaN(value)) {
      throw new Error('CustomerId must be a number.');
    }

    if (!Number.isInteger(value)) {
      throw new Error('CustomerId must be an integer.');
    }

    if (value <= 0) {
      throw new Error('CustomerId must be a positive number.');
    }
  }
}
