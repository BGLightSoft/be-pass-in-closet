import { AccountModel } from 'src/domain/models/account/account.model';

export class AccountResponseDto {
  id: string;
  email: string;
  isActive: boolean;
  isFrozen: boolean;
  createdAt: Date;
  updatedAt: Date;
  accountParameters?: any[];

  constructor(model: AccountModel) {
    this.id = model.id!;
    this.email = model.email;
    this.isActive = model.isActive;
    this.isFrozen = model.isFrozen;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.accountParameters = model.accountParameters;
  }
}
