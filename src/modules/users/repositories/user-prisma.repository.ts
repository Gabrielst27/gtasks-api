import { ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from 'generated/prisma/internal/prismaNamespace';
import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { UserEntity } from 'src/domain/users/entities/user-entity';
import { UserRepository } from 'src/domain/users/repositories/user.repository';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { UserPrismaModelMapper } from 'src/modules/users/repositories/user-prisma-model.mapper';

export class UserPrismaRepository extends UserRepository {
  constructor(private prismaService: PrismaService) {
    super();
  }

  async findById(id: string): Promise<UserEntity> {
    const model = await this.prismaService.user.findUnique({ where: { id } });
    if (!model) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return UserPrismaModelMapper.toEntity(model);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const model = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!model) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return UserPrismaModelMapper.toEntity(model);
  }

  async findMany(
    params: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<UserEntity>> {
    const skip = params.perPage * params.page;
    const take = params.perPage;

    const filters = await this.prismaService.$extends({
      query: {
        user: {
          count({ model, operation, args, query }) {
            args.where = {
              AND: queries.map((q) => ({
                [q.field]:
                  q.operator === EDbOperators.EQUALS
                    ? q.value
                    : {
                        [UserPrismaModelMapper.operatorToModelEnum(q.operator)]:
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
                        [UserPrismaModelMapper.operatorToModelEnum(q.operator)]:
                          q.value,
                      },
              })),
            };
            args.orderBy = { [params.sort]: params.sortDir };
            args.skip = skip;
            args.take = take;
            return query(args);
          },
        },
      },
    });

    const total = await filters.user.count();
    const models = await filters.user.findMany();
    const items = models.map((model) => UserPrismaModelMapper.toEntity(model));

    return new SearchResult({
      items,
      total,
      page: params.page,
      perPage: params.perPage,
      sort: params.sort,
      sortDir: params.sortDir,
    });
  }

  async create(item: UserEntity): Promise<UserEntity> {
    const model = UserPrismaModelMapper.toModel(item);
    try {
      await this.prismaService.user.create({ data: model });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Email já registrado');
      }
      throw new Error('[ERR-002]: Erro desconhecido');
    }
    return item;
  }

  async update(id: string, item: UserEntity): Promise<UserEntity> {
    const model = UserPrismaModelMapper.toModel(item);
    await this.prismaService.user.update({ where: { id }, data: model });
    return item;
  }

  delete(id: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
}
