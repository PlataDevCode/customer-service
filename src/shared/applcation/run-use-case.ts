import { DomainError } from '../../customer/domain/errors/DomainError.js';
import { AppError } from '../errors/AppError.js';
import { translateDomainError } from './transalate-domain-error.js';

export async function runUseCase<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof DomainError) {
      throw translateDomainError(error);
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw error;
  }
}
