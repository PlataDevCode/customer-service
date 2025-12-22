import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

import {
  customerSchemas,
  customerPaths,
} from '../../customer/infrastructure/http/customer.swagger.js';

export function setupSwagger(app: Express) {
  const swaggerSpec = {
    openapi: '3.0.0',
    info: {
      title: 'Customer Service API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local',
      },
    ],
    components: {
      schemas: {
        ...customerSchemas,
      },
    },
    paths: {
      ...customerPaths,
    },
  };

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
