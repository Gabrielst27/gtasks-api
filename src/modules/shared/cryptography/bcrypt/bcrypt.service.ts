import { Injectable } from '@nestjs/common';
import { IBcryptService } from 'src/modules/shared/cryptography/bcrypt/bcrypt.service.interface';
import bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements IBcryptService {
  private salt = bcrypt.genSaltSync(10);

  async generateHash(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compareSync(password, hash);
  }
}
