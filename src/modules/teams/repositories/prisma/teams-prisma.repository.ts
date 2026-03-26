import { ConflictException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { TeamMemberEntity } from 'src/domain/teams/entities/member.entity';
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

  async findByUser(
    userId: string,
  ): Promise<
    SearchResult<{ team: TeamEntity } & { membership: TeamMemberEntity }>
  > {
    const skip = 0;
    const take = 15;

    const models = await this.prismaService.teamMember.findMany({
      where: { userId },
      include: {
        team: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    const entities = models.map((model) =>
      TeamsPrismaModelMapper.toMembershipEntity(model),
    );
    return {
      items: entities,
      total: models.length,
      page: skip,
      perPage: take,
      sort: 'createdAt',
      sortDir: 'desc',
      lastPage: 0,
    };
  }

  findMany(
    params: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<TeamEntity>> {
    throw new Error('Method not implemented.');
  }

  async create(item: TeamEntity): Promise<TeamEntity> {
    const model = TeamsPrismaModelMapper.toTeamModel(item);
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

  async addMember(member: TeamMemberEntity): Promise<TeamMemberEntity> {
    const model = TeamsPrismaModelMapper.toMemberModel(member);
    try {
      await this.prismaService.teamMember.create({ data: model });
      return member;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Membro já adicionado à equipe');
      }
      throw new Error('[ERR-006]: Erro desconhecido');
    }
  }

  update(id: string, item: TeamEntity): Promise<TeamEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<TeamEntity> {
    throw new Error('Method not implemented.');
  }
}
