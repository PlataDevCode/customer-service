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
    await this.createCustomer.execute({
      name: body.name,
      email: body.email,
    });

    return { status: 'ok' };
  };

  getById = async ({ params }: any) => {
    return this.getCustomerById.execute({
      customerId: params.id,
    });
  };

  listByCredit = async () => {
    return this.listCustomersByCredit.execute();
  };

  addCreditToCustomer = async ({ params, body }: any) => {
    await this.addCredit.execute({
      customerId: params.id,
      amount: body.amount,
    });

    return { status: 'ok' };
  };

  subtractCreditFromCustomer = async ({ params, body }: any) => {
    await this.subtractCredit.execute({
      customerId: params.id,
      amount: body.amount,
    });

    return { status: 'ok' };
  };

  update = async ({ params, body }: any) => {
    await this.updateCustomer.execute({
      customerId: params.id,
      ...body,
    });

    return { status: 'ok' };
  };

  delete = async ({ params }: any) => {
    await this.deleteCustomer.execute({
      customerId: params.id,
    });

    return { status: 'ok' };
  };
}
