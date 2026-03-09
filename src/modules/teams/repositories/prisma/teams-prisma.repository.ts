import { ConflictException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { TeamEntity } from 'src/domain/teams/entities/team.entity';
import { TeamRepository } from 'src/domain/teams/repositories/team.repository';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { TeamsPrismaModelMapper } from 'src/modules/teams/repositories/prisma/teams-prisma-model.mapper';

export class TeamsPrismaRepository extends TeamRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  findById(id: string): Promise<TeamEntity> {
    throw new Error('Method not implemented.');
  }
  findMany(
    params: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<TeamEntity>> {
    throw new Error('Method not implemented.');
  }
  async create(item: TeamEntity): Promise<TeamEntity> {
    const model = TeamsPrismaModelMapper.toModel(item);
    const owner = TeamsPrismaModelMapper.createOwner(model);
    try {
      await this.prismaService.$transaction([
        this.prismaService.team.create({ data: model }),
        this.prismaService.teamMember.create({ data: owner }),
      ]);
      return item;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Equipe já existe');
      }
      throw new Error('[ERR-005]: Erro desconhecido');
    }
  }
  update(id: string, item: TeamEntity): Promise<TeamEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<TeamEntity> {
    throw new Error('Method not implemented.');
  }
}
