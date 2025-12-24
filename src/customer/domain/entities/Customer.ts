import {
  AvailableCredit,
  Money,
  CustomerId,
  Email,
} from '../value-objects/index.js';

export class Customer {
  private constructor(
    private readonly _id: CustomerId,
    private _name: string,
    private _email: Email,
    private _availableCredit: AvailableCredit,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  //#region Getters
  public get id(): CustomerId {
    return this._id;
  }

  public get email(): Email {
    return this._email;
  }

  public get name(): string {
    return this._name;
  }

  public get availableCredit(): AvailableCredit {
    return this._availableCredit;
  }
  //#endregion

  //#region Methods
  public static create(id: CustomerId, name: string, email: Email) {
    return new Customer(
      id,
      name,
      email,
      AvailableCredit.zero(),
      new Date(),
      new Date(),
    );
  }

  public addCredit(amount: Money): void {
    this._availableCredit = this._availableCredit.increase(amount);
    this.updatedAt = new Date();
  }
  public subtractCredit(amount: Money): void {
    this._availableCredit = this._availableCredit.decrease(amount);
    this.updatedAt = new Date();
  }

  public updateEmail(email: string): void {
    const newEmail = Email.create(email);

    if (this._email.equals(newEmail)) {
      return;
    }

    this._email = newEmail;
    this.updatedAt = new Date();
  }

  public updateName(name: string): void {
    if (this._name === name) return;
    this._name = name;
    this.updatedAt = new Date();
  }

  public static fromPrimitives(props: {
    id: string;
    name: string;
    email: string;
    availableCredit: number;
    createdAt: string | Date;
    updatedAt: string | Date;
  }): Customer {
    return new Customer(
      CustomerId.create(props.id),
      props.name,
      Email.create(props.email),
      AvailableCredit.from(props.availableCredit),
      new Date(props.createdAt),
      new Date(props.updatedAt),
    );
  }

  public toPrimitives(): {
    id: string;
    name: string;
    email: string;
    availableCredit: number;
    createdAt: string;
    updatedAt: string;
  } {
    return {
      id: this._id.toPrimitive(),
      name: this._name,
      email: this._email.toString(),
      availableCredit: this._availableCredit.toNumber(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  //#endregion
}
