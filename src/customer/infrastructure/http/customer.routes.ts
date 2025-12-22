import { Router } from 'express';
import { httpHandler } from '../../../shared/http/handler.js';
import { CustomerController } from './CustomerController.js';

export function customerRoutes(controller: CustomerController): Router {
  const router = Router();

  router.post('/customers', httpHandler(controller.create));
  router.get('/customers', httpHandler(controller.listByCredit));
  router.get('/customers/:id', httpHandler(controller.getById));

  router.post(
    '/customers/:id/credit/add',
    httpHandler(controller.addCreditToCustomer),
  );

  router.post(
    '/customers/:id/credit/subtract',
    httpHandler(controller.subtractCreditFromCustomer),
  );

  router.patch('/customers/:id', httpHandler(controller.update));
  router.delete('/customers/:id', httpHandler(controller.delete));

  return router;
}
