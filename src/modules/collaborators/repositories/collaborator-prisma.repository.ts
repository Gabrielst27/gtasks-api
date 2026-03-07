import { ConflictException } from '@nestjs/common';
import { log } from 'console';
import { PrismaClientKnownRequestError } from 'generated/prisma/internal/prismaNamespace';
import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { CollaboratorEntity } from 'src/domain/collaborators/entities/collaborator.entity';
import { CollaboratorRepository } from 'src/domain/collaborators/repositories/collaborator.repository';
import { CollaboratorPrismaModelMapper } from 'src/modules/collaborators/repositories/collaborator-prisma-model.mapper';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { mapOperatorToModelEnum } from 'src/modules/shared/prisma/repositories/operator-model.mapper';

export class CollaboratorPrismaRepository extends CollaboratorRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  findById(id: string): Promise<CollaboratorEntity> {
    throw new Error('Method not implemented.');
  }

  async findByProjectAndUser(
    projectId: string,
    userId: string,
  ): Promise<CollaboratorEntity | null> {
    const model = await this.prismaService.projectCollaborator.findFirst({
      where: { AND: [{ projectId }, { userId }] },
    });
    if (!model) return null;
    return CollaboratorPrismaModelMapper.toEntity(model);
  }

  async findMany(
    params: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<CollaboratorEntity>> {
    if (!queries.length) throw new Error('Nenhum filtro fornecido');
    const skip = params.page * params.perPage;
    const take = params.perPage;

    const projectIdQuery = queries.find((query) => query.field === 'projectId');
    if (!projectIdQuery) {
      throw new Error('Projeto não fornecido');
    }

    const filters = this.prismaService.$extends({
      query: {
        projectCollaborator: {
          count({ model, operation, args, query }) {
            args.where = {
              AND: [
                ...queries.map((q) => ({
                  [q.field]:
                    q.operator === EDbOperators.EQUALS
                      ? q.value
                      : { [mapOperatorToModelEnum(q.operator)]: q.value },
                })),
              ],
            };
            return query(args);
          },
          findMany({ model, operation, args, query }) {
            args.where = {
              AND: [
                ...queries.map((q) => ({
                  [q.field]:
                    q.operator === EDbOperators.EQUALS
                      ? q.value
                      : { [mapOperatorToModelEnum(q.operator)]: q.value },
                })),
              ],
            };
            args.skip = skip;
            args.take = take;
            args.orderBy = { [params.sort]: params.sortDir };
            return query(args);
          },
        },
      },
    });

    const total = await filters.projectCollaborator.count();
    const models = await filters.projectCollaborator.findMany();

    const result = new SearchResult({
      items: models.map((model) =>
        CollaboratorPrismaModelMapper.toEntity(model),
      ),
      total,
      page: params.page,
      perPage: params.perPage,
      sort: params.sort,
      sortDir: params.sortDir,
    });
    return result;
  }

  async create(item: CollaboratorEntity): Promise<CollaboratorEntity> {
    const model = CollaboratorPrismaModelMapper.toModel(item);
    try {
      await this.prismaService.projectCollaborator.create({ data: model });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Colaborador já adicionado ao projeto');
      }
      throw new Error('[ERR-001]: Erro desconhecido');
    }
    return item;
  }

  update(id: string, item: CollaboratorEntity): Promise<CollaboratorEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<CollaboratorEntity> {
    throw new Error('Method not implemented.');
  }
}
