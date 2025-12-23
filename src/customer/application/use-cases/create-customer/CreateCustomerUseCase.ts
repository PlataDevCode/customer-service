import { Customer } from '../../../domain/entities/Customer.js';
import { CustomerRepository } from '../../../domain/repositories/CustomerRepository.js';
import { CustomerId, Email } from '../../../domain/value-objects/index.js';
import { CustomerIdGenerator } from '../../ports/CustomerIdGenerator.js';
import { EmailUniquenessPolicy } from '../../ports/EmailUniquenessPolicy.js';
import { CreateCustomerDto } from './CreateCustomerDto.js';

export class CreateCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly idGenerator: CustomerIdGenerator,
    private readonly emailConflictPolicy: EmailUniquenessPolicy,
  ) {}

  public async execute(dto: CreateCustomerDto): Promise<void> {
    const email = Email.create(dto.email);
    await this.emailConflictPolicy.ensureIsUnique(email);

    const customer = Customer.create(
      CustomerId.create(this.idGenerator.generate()),
      dto.name,
      Email.create(dto.email),
    );

    await this.customerRepository.save(customer);
  }
}
