import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../base/base-repository';
import { ApplicationErrors } from 'src/infrastructure/database/postgres/entities/ApplicationErrors';
import { ApplicationErrorModel } from 'src/domain/models/log/application-error.model';
import { IApplicationErrorRepository } from 'src/domain/repositories/log/application-error.repository.interface';
import { ApplicationErrorMapper } from 'src/infrastructure/mappers/log/application-error.mapper';

@Injectable()
export class ApplicationErrorRepository
  extends BaseRepository<ApplicationErrors, ApplicationErrorModel>
  implements IApplicationErrorRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, ApplicationErrors, new ApplicationErrorMapper());
  }
}
