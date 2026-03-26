import { MemberRole, Team, TeamMember } from 'generated/prisma/client';
import { Plan as AppPlan } from 'src/domain/plans/enums/plan.enum';
import { TeamMemberEntity } from 'src/domain/teams/entities/member.entity';
import { TeamEntity } from 'src/domain/teams/entities/team.entity';
import { MemberRole as AppMemberRole } from 'src/domain/teams/enums/member-role.enum';

export class TeamsPrismaModelMapper {
  static toTeamModel(entity: TeamEntity): Team {
    const json = entity.toJson();
    return {
      id: json.id,
      name: json.name,
      slug: json.slug,
      createdById: json.createdById,
      planId: json.planId,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
      disabledAt: json.disabledAt || null,
    };
  }

  static toMemberModel(entity: TeamMemberEntity): TeamMember {
    const json = entity.toJson();
    return {
      id: json.id,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
      userId: json.userId,
      teamId: json.teamId,
      role: TeamsPrismaModelMapper.memberRoleToModelEnum(json.role),
    };
  }

  static toMembershipEntity(
    model: {
      team: Team;
    } & TeamMember,
  ): { team: TeamEntity } & { membership: TeamMemberEntity } {
    const { team, ...memberProps } = model;
    const memberEntity = new TeamMemberEntity(
      {
        userId: memberProps.userId,
        teamId: memberProps.teamId,
        role: TeamsPrismaModelMapper.memberRoleToEntityEnum(memberProps.role),
        createdAt: memberProps.createdAt,
        updatedAt: memberProps.updatedAt,
      },
      memberProps.id,
    );
    const teamEntity = new TeamEntity(
      {
        name: team.name,
        slug: team.slug,
        planId: team.planId,
        createdById: team.createdById,
        disabledAt: team.disabledAt ?? undefined,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
      },
      team.id,
    );
    return { team: teamEntity, membership: memberEntity };
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

  static memberRoleToEntityEnum(memberRole: MemberRole): AppMemberRole {
    const mapper = {
      OWNER: AppMemberRole.OWNER,
      ADMIN: AppMemberRole.ADMIN,
      MEMBER: AppMemberRole.MEMBER,
    };
    return mapper[memberRole];
  }

  static memberRoleToModelEnum(memberRole: AppMemberRole): MemberRole {
    const mapper = {
      owner: MemberRole.OWNER,
      admin: MemberRole.ADMIN,
      member: MemberRole.MEMBER,
    };
    return mapper[memberRole];
  }
}
