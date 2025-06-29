import { ApplicationErrorModel } from 'src/domain/models/log/application-error.model';
import { IBaseRepository } from '../base.repository.interface';
import { ApplicationErrors } from 'src/infrastructure/database/postgres/entities/ApplicationErrors';

export interface IApplicationErrorRepository
  extends IBaseRepository<ApplicationErrors, ApplicationErrorModel> {}

export const IApplicationErrorRepository = Symbol(
  'IApplicationErrorRepository',
);
