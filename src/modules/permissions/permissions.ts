import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { CollaboratorEntity } from 'src/domain/collaborators/entities/collaborator.entity';
import { CommentEntity } from 'src/domain/comments/entities/comment.entity';
import { ProjectEntity } from 'src/domain/projects/entities/project.entity';
import { TaskEntity } from 'src/domain/tasks/entities/task-entity';
import { TeamEntity } from 'src/domain/teams/entities/team.entity';
import { MemberRole } from 'src/domain/teams/enums/member-role.enum';
import { UserEntity } from 'src/domain/users/entities/user-entity';
import { Action } from 'src/common/enum/action.enum';
import { TeamMemberEntity } from 'src/domain/teams/entities/member.entity';
import { Payload } from 'src/domain/auth/models/payload.model';
import { AuthenticatedUserModel } from 'src/domain/auth/models/authenticated-user.model';

type Subjects =
  | InferSubjects<
      | typeof CollaboratorEntity
      | typeof CommentEntity
      | typeof ProjectEntity
      | typeof TaskEntity
      | typeof TeamEntity
      | typeof TeamMemberEntity
      | typeof UserEntity
    >
  | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class PermissionsFactory {
  createForPayload(
    authUser: AuthenticatedUserModel,
    membership: Payload.Membership,
  ) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (membership.role === MemberRole.OWNER) {
      can(Action.Manage, 'all');
      cannot(Action.Manage, UserEntity);
      can(Action.Update, UserEntity, { id: authUser.id });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
