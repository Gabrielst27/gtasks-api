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

  static toEntity(model: ProjectCollaborator): CollaboratorEntity {
    const entity = new CollaboratorEntity(
      {
        userId: model.userId,
        projectId: model.projectId,
        role: CollaboratorPrismaModelMapper.roleToEntityEnum(model.role),
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
      },
      model.id,
    );
    return entity;
  }

  static roleToModelEnum(roleEnum: AppCollaboratorRole): ModelCollaboratorRole {
    const mapper = {
      viewer: ModelCollaboratorRole.VIEWER,
      editor: ModelCollaboratorRole.EDITOR,
      owner: ModelCollaboratorRole.OWNER,
      admin: ModelCollaboratorRole.ADMIN,
    };
    return mapper[roleEnum];
  }

  static roleToEntityEnum(
    roleEnum: ModelCollaboratorRole,
  ): AppCollaboratorRole {
    const mapper = {
      VIEWER: AppCollaboratorRole.VIEWER,
      EDITOR: AppCollaboratorRole.EDITOR,
      OWNER: AppCollaboratorRole.OWNER,
      ADMIN: AppCollaboratorRole.ADMIN,
    };
    return mapper[roleEnum];
  }
}
