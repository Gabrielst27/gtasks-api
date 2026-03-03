import {
  CollaboratorRole as ModelCollaboratorRole,
  ProjectCollaborator,
} from 'generated/prisma/client';
import { CollaboratorEntity } from 'src/domain/collaborators/entities/collaborator.entity';
import { CollaboratorRole as AppCollaboratorRole } from 'src/domain/collaborators/enums/collaborator-role.enum';

export class CollaboratorPrismaModelMapper {
  static toModel(entity: CollaboratorEntity): ProjectCollaborator {
    const json = entity.toJson();
    return {
      id: json.id,
      userId: json.userId,
      projectId: json.projectId,
      role: CollaboratorPrismaModelMapper.roleToModelEnum(json.role),
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    };
  }

  static roleToModelEnum(roleEnum: AppCollaboratorRole): ModelCollaboratorRole {
    const mapper = {
      viewer: ModelCollaboratorRole.VIEWER,
      editor: ModelCollaboratorRole.EDITOR,
      owner: ModelCollaboratorRole.OWNER,
    };
    return mapper[roleEnum];
  }
}
