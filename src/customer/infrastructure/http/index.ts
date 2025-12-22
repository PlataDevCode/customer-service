import { CustomerController } from './CustomerController.js';
import { customerRoutes } from './customer.routes.js';
import { CreateCustomerUseCase } from '../../application/use-cases/create-customer/CreateCustomerUseCase.js';
import { GetCustomerByIdUseCase } from '../../application/use-cases/get-customer-by-id/GetCustomerByIdUseCase.js';
import { ListCustomersSortedByCreditUseCase } from '../../application/use-cases/list-customers-sorted-by-credit/ListCustomersSortedByCreditUseCase.js';
import { AddCreditToCustomerUseCase } from '../../application/use-cases/add-credit-to-customer/AddCreditToCustomerUseCase.js';
import { SubtractCreditFromCustomerUseCase } from '../../application/use-cases/subtract-credit-from-customer/SubtractCreditFromCustomerUseCase.js';
import { UpdateCustomerUseCase } from '../../application/use-cases/update-customer/UpdateCustomerUseCase.js';
import { DeleteCustomerUseCase } from '../../application/use-cases/delete-customer/DeleteCustomerUseCase.js';
import { InMemoryCustomerRepository } from '../repositories/InMemoryCustomerRepository.js';

export function buildCustomerRouter() {
  const repository = new InMemoryCustomerRepository();

  const controller = new CustomerController(
    new CreateCustomerUseCase(repository),
    new GetCustomerByIdUseCase(repository),
    new ListCustomersSortedByCreditUseCase(repository),
    new AddCreditToCustomerUseCase(repository),
    new SubtractCreditFromCustomerUseCase(repository),
    new UpdateCustomerUseCase(repository),
    new DeleteCustomerUseCase(repository),
  );

  return customerRoutes(controller);
}
