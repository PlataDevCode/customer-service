import { randomUUID } from 'node:crypto';
import { CustomerIdGenerator } from '../../application/ports/CustomerIdGenerator.js';

export class UuidCustomerIdGenerator implements CustomerIdGenerator {
  generate(): string {
    return randomUUID();
  }
}
