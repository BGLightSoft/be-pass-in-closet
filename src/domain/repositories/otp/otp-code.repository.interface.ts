import { OtpCodeModel } from 'src/domain/models/otp/otp-code.model';
import { IBaseRepository } from '../base.repository.interface';
import { OtpCodes } from 'src/infrastructure/database/postgres/entities/OtpCodes';

export interface IOtpCodeRepository
  extends IBaseRepository<OtpCodes, OtpCodeModel> {}

export const IOtpCodeRepository = Symbol('IOtpCodeRepository');
