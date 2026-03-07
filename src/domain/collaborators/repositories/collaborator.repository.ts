import { Repository } from 'src/common/repositories/repository';
import { IRepository } from 'src/common/repositories/repository.interface';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { CollaboratorEntity } from 'src/domain/collaborators/entities/collaborator.entity';

interface ICollaboratorRepository extends IRepository<CollaboratorEntity> {
  findByProjectAndUser(
    projectId: string,
    userId: string,
  ): Promise<CollaboratorEntity | null>;
}

export abstract class CollaboratorRepository
  extends Repository
  implements ICollaboratorRepository
{
  protected get searchableFields(): string[] {
    return [...super.searchableFields, 'projectId', 'userId'];
  }

  protected get sortableFields(): string[] {
    return [...super.searchableFields, 'name'];
  }

  abstract findByProjectAndUser(projectId: string, userId: string);
  abstract findById(id: string);
  abstract findMany(params: SearchParams, queries: AppQuery[]);
  abstract create(item: CollaboratorEntity);
  abstract update(id: string, item: CollaboratorEntity);
  abstract delete(id: string);
}
