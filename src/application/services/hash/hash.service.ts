import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hashPassword(plain: string): Promise<string> {
    return await bcrypt.hash(plain, 10);
  }

  async comparePassword(plain: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plain, hash);
  }
}
