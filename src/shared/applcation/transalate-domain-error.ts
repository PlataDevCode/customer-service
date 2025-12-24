import { DomainError } from '../../customer/domain/errors/DomainError.js';
import { HttpError } from '../errors/HttpError.js';

export function translateDomainError(error: DomainError): HttpError {
  switch (error.constructor.name) {
    case 'InvalidMoneyAmountError':
    case 'InvalidEmailError':
    case 'InvalidCustomerIdError':
      return new HttpError(400, 'VALIDATION_ERROR', error.message);
    case 'CustomerNotFoundError':
      return new HttpError(404, 'NOT_FOUND', error.message);

    case 'InsufficientCreditError':
    case 'EmailAlreadyExistsError':
      return new HttpError(409, 'CONFLICT', error.message);

    default:
      return new HttpError(500, 'InternalServerError', 'Internal server error');
  }
}
