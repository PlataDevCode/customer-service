import { Router } from 'express';
import { httpHandler } from '../../../shared/http/handler.js';
import { CustomerController } from './CustomerController.js';

export function customerRoutes(controller: CustomerController): Router {
  const router = Router();

  router.post('/', httpHandler(controller.create));
  router.get('/', httpHandler(controller.listByCredit));
  router.get('/:id', httpHandler(controller.getById));

  router.post('/:id/credit/add', httpHandler(controller.addCreditToCustomer));

  router.post(
    '/:id/credit/subtract',
    httpHandler(controller.subtractCreditFromCustomer),
  );

  router.patch('/:id', httpHandler(controller.update));
  router.delete('/:id', httpHandler(controller.delete));

  return router;
}
