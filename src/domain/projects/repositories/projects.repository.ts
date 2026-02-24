import { IRepository } from 'src/common/repositories/repository.interface';
import { ProjectEntity } from 'src/domain/projects/entities/project.entity';

export interface IProjectRepository extends IRepository<ProjectEntity> {
  findBySlug(slug: string): Promise<ProjectEntity>;
}
