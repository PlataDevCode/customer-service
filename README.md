# Customer Service API

[![CI](https://github.com/PlataDevCode/customer-service/actions/workflows/ci.yml/badge.svg)](https://github.com/PlataDevCode/customer-service/actions)
[![Coverage Status](https://coveralls.io/repos/github/PlataDevCode/customer-service/badge.svg?branch=main)](https://coveralls.io/github/PlataDevCode/customer-service?branch=main)
![Node](https://img.shields.io/badge/node-22.x-green)

Customer Service API built with **Node.js + TypeScript**, following **DDD**, **Clean Architecture**, and **Hexagonal Architecture** principles.

---

## Challenge Overview

The goal of the challenge is to build a REST API for **customer management** in an online motorbike shop, with emphasis on:

- Clean API design
- Strong domain modeling
- Testing as a first-class concern
- Clear architectural decisions
- Deployability using Serverless

---

## Implemented Requirements

### Functional requirements

- CRUD operations for customers
- Add and subtract available credit
- List customers sorted by available credit

### Technical requirements

- Node.js + TypeScript
- Unit and E2E tests
- Serverless deployment (AWS)
- Reproducible infrastructure

---

## Features

- Create, update, and delete customers
- Retrieve customers by ID
- List customers sorted by available credit (asc / desc)
- Add and subtract available credit
- Explicit domain error modeling
- Centralized domain: HTTP error translation
- Framework-agnostic domain and application layers
- Pluggable persistence strategy (in-memory / DynamoDB)

---

## Architecture & Design Decisions

The project follows a **Hexagonal Architecture** with strict boundaries.

### Domain

- Entities (`Customer`)
- Value Objects (`CustomerId`, `Email`, `Money`, `AvailableCredit`)
- Explicit domain errors representing business rule violations
- Business logic isolated from frameworks and infrastructure

### Application

- Use cases orchestrating domain logic
- Policies enforcing business invariants
- No HTTP or persistence dependencies

### Infrastructure

- HTTP layer implemented with **Express**
- Thin controllers delegating to use cases
- Repository implementations:
  - In-memory (default for local and tests)
  - DynamoDB (AWS)

### Shared

- HTTP handler abstraction
- Domain: HTTP error translation
- Cross-cutting concerns

---

## API Overview

| Method | Endpoint                             | Description                     |
| ------ | ------------------------------------ | ------------------------------- |
| POST   | `/api/customers`                     | Create customer                 |
| GET    | `/api/customers/:id`                 | Get customer by ID              |
| GET    | `/api/customers?sort=asc`            | List customers sorted by credit |
| PATCH  | `/api/customers/:id`                 | Update customer                 |
| DELETE | `/api/customers/:id`                 | Delete customer                 |
| POST   | `/api/customers/:id/credit/add`      | Add available credit            |
| POST   | `/api/customers/:id/credit/subtract` | Subtract available credit       |

---

## Postman Collection

### Import from repository

The repository includes a `postman/` directory containing:

- `customer-service.postman_collection.json`
- `customer-service.postman_environment.json`

Steps:

1. Open Postman
2. Click **Import**
3. Select both JSON files from the `postman/` directory
4. Activate the imported environment

### Public Postman workspace

[![Run in Postman](https://run.pstmn.io/button.svg)](https://soma77-5509.postman.co/workspace/My-Workspace~9945fd80-f121-489b-8ecc-337dd2679a0d/collection/24468472-1fd2e733-e80f-44ac-bcb9-f0ade2921f06)

---

## Testing Strategy

- **Unit tests**
  - Domain entities and value objects
  - Use cases and business policies

- **E2E tests**
  - Full HTTP flow
  - Error scenarios and edge cases

Tests are enforced via CI and coverage is reported with Coveralls.

---

## Running Locally

### Requirements

- Node.js **>= 22**
- npm

### Install dependencies

```bash
npm install
```

### Run tests

Unit + e2e

```bash
npm test
```

Unit

```bash
npm:unit
```

E2E

```bash
npm:e2e
```

### Run locally (in-memory persistence)

```bash
npm run dev
```

---

## Deployment (Serverless + AWS)

The API is deployed using **AWS Lambda** and **API Gateway** via the **Serverless Framework**.

### Environment strategy

- A `dev` stage is used as a **production-like environment** for demonstration purposes.
- This avoids labeling the deployment as real production while still proving infrastructure usage.

### Deploy to AWS

```bash
npm run build
serverless deploy
```

The deployed endpoint can be retrieved with:

```bash
serverless info
```

---

## Persistence (DynamoDB)

The application supports multiple persistence strategies.

### Local / Tests

- In-memory repository
- Zero setup required

### AWS

- DynamoDB-backed repository
- Table provisioned automatically by Serverless
- Repository selected via environment configuration

---

## DynamoDB Seed

A **manual seed script** is included to verify real persistence.

```bash
npm run seed:dynamodb
```

Data can be verified via:

- AWS DynamoDB Console
- API endpoints

---

## Notes on Production Readiness

For a real production system, additional concerns would be addressed:

- Authentication and authorization
- Rate limiting and throttling
- Pagination
- Observability
- Continuous Deployment (CD)

These were intentionally excluded to keep the challenge focused.

---

## Final Notes

This project is designed to be:

- Easy to reason about
- Easy to test
- Easy to deploy
