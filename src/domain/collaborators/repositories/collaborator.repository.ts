import { IRepository } from 'src/common/repositories/repository.interface';
import { CollaboratorEntity } from 'src/domain/collaborators/entities/collaborator.entity';

export interface ICollaboratorRepository extends IRepository<CollaboratorEntity> {}
