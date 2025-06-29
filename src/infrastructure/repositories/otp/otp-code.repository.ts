import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { IOtpCodeRepository } from 'src/domain/repositories/otp/otp-code.repository.interface';
import { BaseRepository } from '../base/base-repository';
import { OtpCodes } from 'src/infrastructure/database/postgres/entities/OtpCodes';
import { OtpCodeModel } from 'src/domain/models/otp/otp-code.model';
import { OtpCodeMapper } from 'src/infrastructure/mappers/otp/otp-code.mapper';

@Injectable()
export class OtpCodeRepository
  extends BaseRepository<OtpCodes, OtpCodeModel>
  implements IOtpCodeRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, OtpCodes, new OtpCodeMapper());
  }
}
