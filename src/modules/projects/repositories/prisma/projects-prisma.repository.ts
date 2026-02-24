import { Injectable, NotFoundException } from '@nestjs/common';
import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { ProjectEntity } from 'src/domain/projects/entities/project.entity';
import { ProjectPrismaModelMapper } from 'src/modules/projects/repositories/prisma/project-prisma-model.mapper';
import { IProjectRepository } from 'src/domain/projects/repositories/projects.repository';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';

@Injectable()
export class ProjectsPrismaRepository implements IProjectRepository {
  protected searchableFields: string[] = ['createdAt', 'updatedAt', 'name'];
  protected sortableFields: string[] = ['createdAt', 'updatedAt'];

  constructor(private prismaService: PrismaService) {}

  async findBySlug(slug: string): Promise<ProjectEntity> {
    const model = await this.prismaService.project.findUnique({
      where: { slug },
    });
    if (!model) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return ProjectPrismaModelMapper.toEntity(model);
  }

  async findById(id: string): Promise<ProjectEntity> {
    const model = await this.prismaService.project.findFirst({
      where: { id },
      include: { tasks: {} },
    });
    if (!model) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return ProjectPrismaModelMapper.toEntity(model);
  }

  async findMany(
    params: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<ProjectEntity>> {
    const skip = params.page * params.perPage;
    const take = params.perPage;

    //TODO: create prisma query builder
    const filters = this.prismaService.$extends({
      query: {
        project: {
          count({ model, operation, args, query }) {
            args.where = {
              AND: queries.map((q) => ({
                [q.field]:
                  q.operator === EDbOperators.EQUALS
                    ? q.value
                    : {
                        [ProjectPrismaModelMapper.enumToOperator(q.operator)]:
                          q.value,
                      },
              })),
            };
            return query(args);
          },
          findMany({ model, operation, args, query }) {
            args.where = {
              AND: queries.map((q) => ({
                [q.field]:
                  q.operator === EDbOperators.EQUALS
                    ? q.value
                    : {
                        [ProjectPrismaModelMapper.enumToOperator(q.operator)]:
                          q.value,
                      },
              })),
            };
            args.orderBy = { [params.sort]: params.sortDir };
            args.take = take;
            args.skip = skip;
            return query(args);
          },
        },
      },
    });

    const total = await filters.project.count();
    const itemModels = await filters.project.findMany();
    const items = itemModels.map((model) =>
      ProjectPrismaModelMapper.toEntity(model),
    );

    return new SearchResult<ProjectEntity>({
      items,
      page: 0,
      perPage: 15,
      total,
      sort: params.sort,
      sortDir: params.sortDir,
    });
  }

  async create(item: ProjectEntity): Promise<ProjectEntity> {
    const model = ProjectPrismaModelMapper.toModel(item);
    await this.prismaService.project.create({
      data: model,
    });
    return item;
  }

  async update(id: string, item: ProjectEntity): Promise<ProjectEntity> {
    const model = ProjectPrismaModelMapper.toModel(item);
    await this.prismaService.project.update({
      where: { id },
      data: model,
    });
    return item;
  }

  delete(id: string): Promise<ProjectEntity> {
    throw new Error('Method not implemented.');
  }
}
