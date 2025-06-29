import { OtpCodeTypeEnum } from 'src/domain/enums/otp/otp-code-type.enum';

export class OtpCodeModel {
  public readonly accountId: string;
  public readonly type: OtpCodeTypeEnum | null;
  public readonly code: string | null;
  public readonly usedAt: Date | null;
  public readonly expireAt: Date | null;
  public readonly createdAt: Date;

  constructor(props: Partial<OtpCodeModel> = {}) {
    this.accountId = props.accountId ?? '';
    this.type = props.type ?? null;
    this.code = props.code ?? null;
    this.usedAt = props.usedAt ?? null;
    this.expireAt = props.expireAt ?? null;
    this.createdAt = props.createdAt ?? new Date();
  }
}
