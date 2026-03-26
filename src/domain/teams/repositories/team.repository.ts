import { Repository } from 'src/common/repositories/repository';
import { IRepository } from 'src/common/repositories/repository.interface';
import { SearchParams } from 'src/common/repositories/search-params';
import { SearchResult } from 'src/common/repositories/search-result';
import { AppQuery } from 'src/common/utils/app-queries/app-query';
import { TeamMemberEntity } from 'src/domain/teams/entities/member.entity';
import { TeamEntity } from 'src/domain/teams/entities/team.entity';

export abstract class TeamRepository
  extends Repository
  implements IRepository<TeamEntity>
{
  protected get searchableFields(): string[] {
    return [...this.searchableFields, 'name', 'slug'];
  }

  protected get sortableFields(): string[] {
    return [...this.sortableFields, 'name'];
  }

  abstract findByUser(
    userId: string,
  ): Promise<
    SearchResult<{ team: TeamEntity } & { membership: TeamMemberEntity }>
  >;
  abstract findById(id: string): Promise<TeamEntity>;
  abstract findMany(
    params: SearchParams,
    queries: AppQuery[],
  ): Promise<SearchResult<TeamEntity>>;
  abstract create(item: TeamEntity): Promise<TeamEntity>;
  abstract addMember(member: TeamMemberEntity): Promise<TeamMemberEntity>;
  abstract update(id: string, item: TeamEntity): Promise<TeamEntity>;
  abstract delete(id: string): Promise<TeamEntity>;
}
