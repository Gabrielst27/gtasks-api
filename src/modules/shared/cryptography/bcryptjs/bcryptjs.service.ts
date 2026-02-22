import { Injectable } from '@nestjs/common';
import { IBcryptService } from 'src/modules/shared/cryptography/bcryptjs/bcryptjs.service.interface';
import bcryptjs from 'bcryptjs';

@Injectable()
export class BcryptjsService implements IBcryptService {
  private salt = bcryptjs.genSaltSync(10);

  generateHash(password: string) {
    return bcryptjs.hashSync(password, this.salt);
  }

  verifyPassword(password: string, hash: string): boolean {
    return bcryptjs.compareSync(password, hash);
  }
}
