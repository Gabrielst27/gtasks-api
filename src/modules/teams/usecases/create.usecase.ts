import { BadRequestException, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { TeamEntity } from 'src/domain/teams/entities/team.entity';
import { Plan } from 'src/domain/plans/enums/plan.enum';
import { TeamRepository } from 'src/domain/teams/repositories/team.repository';
import { TeamResponse } from 'src/modules/teams/dtos/responses/team-response.dto';

export namespace CreateTeam {
  export type Input = {
    name: string;
    slug: string;
    planId: string;
    createdById: string;
  };

  export type Output = TeamResponse.Dto;

  @Injectable()
  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly repository: TeamRepository) {}

    async execute(input: Input): Promise<TeamResponse.Dto> {
      const { name, slug, planId, createdById } = input;
      if (!name || !slug || !planId || !createdById) {
        throw new BadRequestException('Dados inválidos');
      }
      const team = new TeamEntity(input);
      const result = await this.repository.create(team);
      return TeamResponse.Mapper.entityToResponse(result);
    }
  }
}
