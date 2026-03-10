import { Injectable } from '@nestjs/common';
import { TeamRepository } from 'src/domain/teams/repositories/team.repository';
import { AuthenticatedUserDto } from 'src/modules/auth/dtos/authenticated-user.dto';
import { PlansService } from 'src/modules/plans/plans.service';
import { TeamRequestDto } from 'src/modules/teams/dtos/requests/team-request.dto';
import { TeamResponse } from 'src/modules/teams/dtos/responses/team-response.dto';
import { CreateTeam } from 'src/modules/teams/usecases/create.usecase';
import { FindTeamByUser } from 'src/modules/teams/usecases/find-by-user.usecase';

@Injectable()
export class TeamsService {
  constructor(
    private readonly plansService: PlansService,
    private readonly repository: TeamRepository,
  ) {}

  async create(
    authUser: AuthenticatedUserDto,
    data: TeamRequestDto,
  ): Promise<TeamResponse.Dto> {
    const planId = this.plansService.getStarterPlanId();
    const create = new CreateTeam.UseCase(this.repository);
    return await create.execute({
      name: data.name,
      slug: data.slug,
      planId,
      createdById: authUser.id,
    });
  }

  async findByUser(userId: string) {
    const find = new FindTeamByUser.UseCase(this.repository);
    return await find.execute({ userId });
  }
}
