import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { TaskEntity } from 'src/domain/tasks/entities/task-entity';
import { TaskPrismaModelMapper } from 'src/modules/tasks/repositories/prisma/task-prisma-model.mapper';
import { TaskRepository } from 'src/domain/tasks/repositories/task-repository';
import { PrismaClientKnownRequestError } from 'generated/prisma/internal/prismaNamespace';

export class TaskPrismaRepository extends TaskRepository {
  constructor(private prismaService: PrismaService) {
    super();
  }

  async findById(id: string): Promise<TaskEntity> {
    const model = await this.prismaService.task.findUnique({
      where: { id },
    });
    if (!model) throw new NotFoundException('Task não encontrada');
    return TaskPrismaModelMapper.toEntity(model);
  }

  async findMany(
    searchParams: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<TaskEntity>> {
    const skip = searchParams.perPage * searchParams.page;
    const take = searchParams.perPage;

    const filters = await this.prismaService.$extends({
      query: {
        task: {
          count({ model, operation, args, query }) {
            args.where = {
              AND: queries.map((q) => ({
                [q.field]:
                  q.operator === EDbOperators.EQUALS
                    ? q.value
                    : {
                        [TaskPrismaModelMapper.operatorToModelEnum(q.operator)]:
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
                        [TaskPrismaModelMapper.operatorToModelEnum(q.operator)]:
                          q.value,
                      },
              })),
            };
            args.orderBy = { [searchParams.sort]: searchParams.sortDir };
            args.skip = skip;
            args.take = take;
            return query(args);
          },
        },
      },
    });

    const total = await filters.task.count();
    const models = await filters.task.findMany();
    const items = models.map((model) => TaskPrismaModelMapper.toEntity(model));

    return new SearchResult({
      items,
      total,
      page: searchParams.page,
      perPage: searchParams.perPage,
      sort: searchParams.sort,
      sortDir: searchParams.sortDir,
    });
  }

  async create(item: TaskEntity): Promise<TaskEntity> {
    const model = TaskPrismaModelMapper.toModel(item);
    try {
      await this.prismaService.task.create({
        data: model,
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Tareja já registrada');
      }
      throw new Error('[ERR-004]: Erro desconhecido');
    }
    return item;
  }

  async update(id: string, item: TaskEntity): Promise<TaskEntity> {
    const model = TaskPrismaModelMapper.toModel(item);
    await this.prismaService.task.update({
      where: { id },
      data: model,
    });
    return item;
  }

  delete(id: string): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
}
