import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { CollaboratorEntity } from 'src/domain/collaborators/entities/collaborator.entity';
import { ICollaboratorRepository } from 'src/domain/collaborators/repositories/collaborator.repository';
import { CollaboratorPrismaModelMapper } from 'src/modules/collaborators/repositories/collaborator-prisma-model.mapper';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';

export class CollaboratorPrismaRepository implements ICollaboratorRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findById(id: string): Promise<CollaboratorEntity> {
    throw new Error('Method not implemented.');
  }

  async findMany(
    params: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<CollaboratorEntity>> {
    const skip = params.page * params.perPage;
    const take = params.perPage;

    throw new Error('Method not implemented');
  }

  async create(item: CollaboratorEntity): Promise<CollaboratorEntity> {
    const model = CollaboratorPrismaModelMapper.toModel(item);
    await this.prismaService.projectCollaborator.create({ data: model });
    return item;
  }

  update(id: string, item: CollaboratorEntity): Promise<CollaboratorEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<CollaboratorEntity> {
    throw new Error('Method not implemented.');
  }
}
