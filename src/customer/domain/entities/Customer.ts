import { AvailableCredit, Money, CustomerId } from '../value-objects/index.js';

export class Customer {
  private constructor(
    private readonly _id: CustomerId,
    private _name: string,
    private _email: string,
    private _availableCredit: AvailableCredit,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  //#region Getters
  public get name(): string {
    return this._name;
  }
  public get availableCredit(): AvailableCredit {
    return this._availableCredit;
  }
  //#endregion

  //#region Methods
  public static create(id: CustomerId, name: string, email: string) {
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
  public updateEmail(email: string) {
    this._email = email;
    this.updatedAt = new Date();
  }
  //#endregion
}
