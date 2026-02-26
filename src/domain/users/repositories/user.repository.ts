import { IRepository } from 'src/common/repositories/repository.interface';
import { UserEntity } from 'src/domain/users/entities/user-entity';

export interface IUserRepository extends IRepository<UserEntity> {
  emailExists(email: string): Promise<void>;
}
