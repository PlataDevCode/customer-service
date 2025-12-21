export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(raw: string): Email {
    const email = Email.fromRaw(raw);
    email.assertIsValid();
    return email;
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }

  private static fromRaw(raw: string): Email {
    return new Email(raw.trim().toLowerCase());
  }

  private assertIsValid(): void {
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!regex.test(this.value)) {
      throw new Error(`Invalid email format: ${this.value}`);
    }
  }
}
