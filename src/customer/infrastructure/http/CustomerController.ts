import { runUseCase } from '../../../shared/applcation/run-use-case.js';
import { AddCreditToCustomerUseCase } from '../../application/use-cases/add-credit-to-customer/AddCreditToCustomerUseCase.js';
import { CreateCustomerUseCase } from '../../application/use-cases/create-customer/CreateCustomerUseCase.js';
import { DeleteCustomerUseCase } from '../../application/use-cases/delete-customer/DeleteCustomerUseCase.js';
import { GetCustomerByIdUseCase } from '../../application/use-cases/get-customer-by-id/GetCustomerByIdUseCase.js';
import { ListCustomersSortedByCreditUseCase } from '../../application/use-cases/list-customers-sorted-by-credit/ListCustomersSortedByCreditUseCase.js';
import { SubtractCreditFromCustomerUseCase } from '../../application/use-cases/subtract-credit-from-customer/SubtractCreditFromCustomerUseCase.js';
import { UpdateCustomerUseCase } from '../../application/use-cases/update-customer/UpdateCustomerUseCase.js';

export class CustomerController {
  constructor(
    private readonly createCustomer: CreateCustomerUseCase,
    private readonly getCustomerById: GetCustomerByIdUseCase,
    private readonly listCustomersByCredit: ListCustomersSortedByCreditUseCase,
    private readonly addCredit: AddCreditToCustomerUseCase,
    private readonly subtractCredit: SubtractCreditFromCustomerUseCase,
    private readonly updateCustomer: UpdateCustomerUseCase,
    private readonly deleteCustomer: DeleteCustomerUseCase,
  ) {}

  create = async ({ body }: any) => {
    const customer = await runUseCase(() =>
      this.createCustomer.execute({
        name: body.name,
        email: body.email,
      }),
    );

    return {
      id: customer.id.toPrimitive(),
      name: customer.name,
      email: customer.email.toString(),
      availableCredit: customer.availableCredit.toNumber(),
    };
  };

  getById = async ({ params }: any) => {
    const customer = await runUseCase(() =>
      this.getCustomerById.execute({
        customerId: params.id,
      }),
    );

    return {
      id: customer.id.toPrimitive(),
      name: customer.name,
      email: customer.email.toString(),
      availableCredit: customer.availableCredit.toNumber(),
    };
  };

  listByCredit = async ({ query }: any) => {
    const order =
      query?.order === 'asc' || query?.order === 'desc' ? query.order : 'desc';

    return runUseCase(() => this.listCustomersByCredit.execute(order));
  };

  addCreditToCustomer = async ({ params, body }: any) => {
    const customer = await runUseCase(() =>
      this.addCredit.execute({
        customerId: params.id,
        amount: body.amount,
      }),
    );

    return {
      id: customer.id.toPrimitive(),
      name: customer.name,
      email: customer.email.toString(),
      availableCredit: customer.availableCredit.toNumber(),
    };
  };

  subtractCreditFromCustomer = async ({ params, body }: any) => {
    const customer = await runUseCase(() =>
      this.subtractCredit.execute({
        customerId: params.id,
        amount: body.amount,
      }),
    );

    return {
      id: customer.id.toPrimitive(),
      name: customer.name,
      email: customer.email.toString(),
      availableCredit: customer.availableCredit.toNumber(),
    };
  };

  update = async ({ params, body }: any) => {
    const customer = await runUseCase(() =>
      this.updateCustomer.execute({
        customerId: params.id,
        ...body,
      }),
    );

    return {
      id: customer.id.toPrimitive(),
      name: customer.name,
      email: customer.email.toString(),
      availableCredit: customer.availableCredit.toNumber(),
    };
  };

  delete = async ({ params }: any) => {
    await runUseCase(() =>
      this.deleteCustomer.execute({
        customerId: params.id,
      }),
    );

    return {};
  };
}
