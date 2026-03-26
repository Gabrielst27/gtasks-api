import { CollaboratorEntity } from 'src/domain/collaborators/entities/collaborator.entity';
import { CommentEntity } from 'src/domain/comments/entities/comment.entity';
import { ProjectEntity } from 'src/domain/projects/entities/project.entity';
import { TaskEntity } from 'src/domain/tasks/entities/task-entity';
import { TeamEntity } from 'src/domain/teams/entities/team.entity';
import { UserEntity } from 'src/domain/users/entities/user-entity';

export type PermissionSubjects =
  | typeof CollaboratorEntity
  | typeof CommentEntity
  | typeof ProjectEntity
  | typeof TaskEntity
  | typeof TeamEntity
  | typeof UserEntity
  | 'all';
