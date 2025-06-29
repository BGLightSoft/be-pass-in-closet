import { OtpCodeTypeEnum } from 'src/domain/enums/otp/otp-code-type.enum';
import { IMapper } from 'src/domain/mapper/mapper.interface';
import { OtpCodeModel } from 'src/domain/models/otp/otp-code.model';
import { OtpCodes } from 'src/infrastructure/database/postgres/entities/OtpCodes';

export class OtpCodeMapper implements IMapper<OtpCodes, OtpCodeModel> {
  toDomain(entity: OtpCodes): OtpCodeModel {
    return new OtpCodeModel({
      accountId: entity.accounts?.id ?? '',
      type: entity.type as OtpCodeTypeEnum,
      code: entity.code,
      usedAt: entity.usedAt ? new Date(entity.usedAt) : null,
      expireAt: entity.expireAt ? new Date(entity.expireAt) : null,
      createdAt: entity.createdAt ? new Date(entity.createdAt) : new Date(),
    });
  }

  toEntity(domain: OtpCodeModel): OtpCodes {
    const entity = new OtpCodes();
    entity.type = domain.type;
    entity.code = domain.code;
    entity.usedAt = domain.usedAt ?? null;
    entity.expireAt = domain.expireAt ?? null;
    entity.createdAt = domain.createdAt;
    entity.accounts = { id: domain.accountId } as any;
    return entity;
  }
}
