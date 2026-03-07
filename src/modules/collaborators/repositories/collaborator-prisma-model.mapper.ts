import {
  CollaboratorRole,
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
    };
    return mapper[roleEnum];
  }

  static roleToEntityEnum(
    roleEnum: ModelCollaboratorRole,
  ): AppCollaboratorRole {
    const mapper = {
      viewer: AppCollaboratorRole.VIEWER,
      editor: AppCollaboratorRole.EDITOR,
      owner: AppCollaboratorRole.OWNER,
    };
    return mapper[roleEnum];
  }
}
