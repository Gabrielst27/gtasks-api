import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { ICryptography } from 'src/common/utils/cryptography/cryptography.interface';

@Injectable()
export class BcryptService implements ICryptography {
  private salt = bcrypt.genSaltSync(10);

  async generateHash(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compareSync(password, hash);
  }
}
