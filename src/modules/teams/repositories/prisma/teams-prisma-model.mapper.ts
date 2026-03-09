import { MemberRole, Plan, Team, TeamMember } from 'generated/prisma/client';
import { Plan as AppPlan } from 'src/domain/plans/enums/plan.enum';
import { TeamMemberEntity } from 'src/domain/teams/entities/member.entity';
import { TeamEntity } from 'src/domain/teams/entities/team.entity';
import { MemberRole as AppMemberRole } from 'src/domain/teams/enums/member-role.enum';

export class TeamsPrismaModelMapper {
  static toModel(entity: TeamEntity): Team {
    const json = entity.toJson();
    return {
      id: json.id,
      name: json.name,
      slug: json.slug,
      createdById: json.createdById,
      plan: TeamsPrismaModelMapper.planToModelEnum(json.plan),
      planId: json.planId,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
      disabledAt: json.disabledAt || null,
    };
  }

  static createOwner(model: Team): TeamMember {
    const owner = new TeamMemberEntity({
      userId: model.createdById,
      teamId: model.id,
      role: AppMemberRole.OWNER,
    });
    const json = owner.toJson();
    return {
      id: json.id,
      userId: json.userId,
      teamId: json.teamId,
      role: TeamsPrismaModelMapper.memberRoleToModelEnum(json.role),
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    };
  }

  static memberRoleToModelEnum(memberRole: AppMemberRole): MemberRole {
    const mapper = {
      owner: MemberRole.OWNER,
      admin: MemberRole.ADMIN,
      member: MemberRole.MEMBER,
    };
    return mapper[memberRole];
  }

  static planToModelEnum(planEnum: AppPlan): Plan {
    const mapper = {
      starter: Plan.STARTER,
      pro: Plan.PRO,
      corporate: Plan.CORPORATE,
    };
    return mapper[planEnum];
  }
}
