import { BadRequestException } from '@nestjs/common';
import { SearchResult } from 'src/common/repositories/search-result';
import { SearchUseCase } from 'src/common/usecases/search.usecase';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { TeamMemberEntity } from 'src/domain/teams/entities/member.entity';
import { TeamEntity } from 'src/domain/teams/entities/team.entity';
import { TeamRepository } from 'src/domain/teams/repositories/team.repository';
import { MemberResponse } from 'src/modules/teams/dtos/responses/member-response.dto';
import { TeamResponse } from 'src/modules/teams/dtos/responses/team-response.dto';

export namespace FindTeamByUser {
  export type Input = {
    userId: string;
  };
  export type Output = SearchResult<
    { team: TeamResponse.Dto } & { membership: MemberResponse.Dto }
  >;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly repository: TeamRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.userId) {
        throw new BadRequestException('Dados inválidos');
      }
      const result = await this.repository.findByUser(input.userId);
      return this.convertToResponse(result);
    }

    private convertToResponse(
      entityResult: SearchResult<
        { team: TeamEntity } & { membership: TeamMemberEntity }
      >,
    ): SearchResult<
      { team: TeamResponse.Dto } & { membership: MemberResponse.Dto }
    > {
      const responses =
        entityResult.items && entityResult.items.length
          ? entityResult.items.map((item) =>
              TeamResponse.Mapper.entityToMembership(item),
            )
          : [];
      return {
        ...entityResult,
        items: responses,
      };
    }
  }
}
