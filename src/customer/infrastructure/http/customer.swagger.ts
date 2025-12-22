//#region SCHEMAS
export const customerSchemas = {
  Customer: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'cst_123' },
      name: { type: 'string', example: 'Alex' },
      email: { type: 'string', example: 'alex@test.com' },
      availableCredit: { type: 'number', example: 1500 },
    },
    required: ['id', 'name', 'email', 'availableCredit'],
  },

  CreateCustomerRequest: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Alex' },
      email: { type: 'string', example: 'alex@test.com' },
    },
    required: ['name', 'email'],
  },

  AddCreditRequest: {
    type: 'object',
    properties: {
      amount: { type: 'number', example: 100, minimum: 1 },
    },
    required: ['amount'],
  },

  ErrorResponse: {
    type: 'object',
    properties: {
      code: { type: 'string', example: 'CUSTOMER_NOT_FOUND' },
      message: { type: 'string', example: 'Customer not found' },
    },
    required: ['code', 'message'],
  },
};
//#endregion

export const customerPaths = {
  //#region CUSTOMERS
  '/api/customers': {
    //#region CREATE
    post: {
      summary: 'Create a customer',
      tags: ['Customers'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateCustomerRequest' },
          },
        },
      },
      responses: {
        201: {
          description: 'Customer created',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Customer' },
            },
          },
        },
        409: {
          description: 'Customer already exists',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
    //#endregion

    //#region LIST
    get: {
      summary: 'List customers sorted by available credit',
      tags: ['Customers'],
      parameters: [
        {
          in: 'query',
          name: 'order',
          required: false,
          schema: { type: 'string', enum: ['asc', 'desc'] },
          description: 'Sort by available credit',
        },
      ],
      responses: {
        200: {
          description: 'List of customers',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Customer' },
              },
            },
          },
        },
      },
    },
    //#endregion
  },
  //#endregion

  //#region BY ID
  '/api/customers/{id}': {
    //#region GET BY ID
    get: {
      summary: 'Get customer by id',
      tags: ['Customers'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'Customer found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Customer' },
            },
          },
        },
        404: {
          description: 'Customer not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
    //#endregion

    //#region UPDATE
    patch: {
      summary: 'Update customer',
      tags: ['Customers'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateCustomerRequest' },
          },
        },
      },
      responses: {
        200: {
          description: 'Customer updated',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Customer' },
            },
          },
        },
        404: {
          description: 'Customer not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
    //#endregion

    //#region DELETE
    delete: {
      summary: 'Delete customer',
      tags: ['Customers'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        204: {
          description: 'Customer deleted',
        },
        404: {
          description: 'Customer not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
    //#endregion
  },
  //#endregion

  //#region ADD CREDIT
  '/api/customers/{id}/credit/add': {
    post: {
      summary: 'Add credit to customer',
      tags: ['Customers'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/AddCreditRequest' },
          },
        },
      },
      responses: {
        200: {
          description: 'Credit added',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Customer' },
            },
          },
        },
        404: {
          description: 'Customer not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
        422: {
          description: 'Invalid credit amount',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },
  //#endregion

  //#region SUBTRACT CREDIT
  '/api/customers/{id}/credit/subtract': {
    post: {
      summary: 'Subtract credit from customer',
      tags: ['Customers'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/AddCreditRequest' },
          },
        },
      },
      responses: {
        200: {
          description: 'Credit subtracted',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Customer' },
            },
          },
        },
        404: {
          description: 'Customer not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
        409: {
          description: 'Insufficient credit',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
    },
  },
  //#endregion
};
