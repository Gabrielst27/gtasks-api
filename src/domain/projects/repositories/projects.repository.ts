import { Repository } from 'src/common/repositories/repository';
import { IRepository } from 'src/common/repositories/repository.interface';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { ProjectEntity } from 'src/domain/projects/entities/project.entity';

interface IProjectRepository extends IRepository<ProjectEntity> {
  findBySlug(slug: string): Promise<ProjectEntity>;
}

export abstract class ProjectRepository
  extends Repository
  implements IProjectRepository
{
  protected get searchableFields(): string[] {
    return [...super.searchableFields, 'name'];
  }

  protected get sortableFields(): string[] {
    return [...super.sortableFields, 'name'];
  }

  abstract findBySlug(slug: string): Promise<ProjectEntity>;
  abstract findById(id: string): Promise<ProjectEntity>;
  abstract findMany(
    params: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<ProjectEntity>>;
  abstract create(item: ProjectEntity): Promise<ProjectEntity>;
  abstract update(id: string, item: ProjectEntity): Promise<ProjectEntity>;
  abstract delete(id: string): Promise<ProjectEntity>;
}
