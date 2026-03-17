import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Action } from 'src/common/enum/action.enum';
import { MemberRole } from 'src/domain/teams/enums/member-role.enum';
import { TeamRepository } from 'src/domain/teams/repositories/team.repository';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthenticatedUserModel } from 'src/domain/auth/models/authenticated-user.model';
import { PlansService } from 'src/modules/plans/plans.service';
import { AddMemberRequestDto } from 'src/modules/teams/dtos/requests/add-member-request.dto';
import { TeamRequestDto } from 'src/modules/teams/dtos/requests/team-request.dto';
import { MemberResponse } from 'src/modules/teams/dtos/responses/member-response.dto';
import { TeamResponse } from 'src/modules/teams/dtos/responses/team-response.dto';
import { AddMember } from 'src/modules/teams/usecases/add-member.usecase';
import { CreateTeam } from 'src/modules/teams/usecases/create.usecase';
import { FindTeamByUser } from 'src/modules/teams/usecases/find-by-user.usecase';

@Injectable()
export class TeamsService {
  @Inject(AddMember.UseCase)
  private readonly addMemberUsecase: AddMember.UseCase;
  @Inject(CreateTeam.UseCase)
  private readonly createTeamUsecase: CreateTeam.UseCase;
  @Inject(FindTeamByUser.UseCase)
  private readonly findTeamByUserUsecase: FindTeamByUser.UseCase;

  @Inject(PlansService) private readonly plansService: PlansService;
  @Inject(forwardRef(() => AuthService))
  private readonly authService: AuthService;

  constructor() {}

  async create(
    authUser: AuthenticatedUserModel,
    data: TeamRequestDto,
  ): Promise<TeamResponse.Dto> {
    const planId = this.plansService.getStarterPlanId();
    return await this.createTeamUsecase.execute({
      name: data.name,
      slug: data.slug,
      planId,
      createdById: authUser.id,
    });
  }

  async addMember(
    authUser: AuthenticatedUserModel,
    teamId: string,
    data: AddMemberRequestDto,
  ): Promise<MemberResponse.Dto> {
    const roleMapper = {
      admin: MemberRole.ADMIN,
      member: MemberRole.MEMBER,
    };
    const role = data.role ? roleMapper[data.role] : undefined;
    return await this.addMemberUsecase.execute({
      userId: data.userId,
      teamId,
      role,
    });
  }

  async findByUser(userId: string) {
    return await this.findTeamByUserUsecase.execute({ userId });
  }
}
