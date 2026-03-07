import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { CollaboratorEntity } from 'src/domain/collaborators/entities/collaborator.entity';
import { CollaboratorRole } from 'src/domain/collaborators/enums/collaborator-role.enum';
import { CollaboratorRepository } from 'src/domain/collaborators/repositories/collaborator.repository';
import { CollaboratorResponse } from 'src/modules/collaborators/dtos/responses/collaborator-response.dto';
import { ProjectResponse } from 'src/modules/projects/dtos/responses/project-response.dto';

export namespace AddCollaborator {
  export type Input = {
    authorId: string;
    userId: string;
    project: ProjectResponse.Dto;
    role?: CollaboratorRole;
  };

  export type Output = CollaboratorResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly repository: CollaboratorRepository) {}

    async execute(input: Input): Promise<CollaboratorResponse.Dto> {
      const { authorId, userId, project, role } = input;
      if (!authorId || !userId || !project) {
        throw new BadRequestException('Dados inválidos');
      }

      await this.verifyAuthorPermission(authorId, project, role);

      const entity = new CollaboratorEntity({
        userId,
        projectId: project.id,
        role,
      });
      const result = await this.repository.create(entity);
      return CollaboratorResponse.Mapper.toResponse(result);
    }

    private async verifyAuthorPermission(
      authorId: string,
      project: ProjectResponse.Dto,
      role?: CollaboratorRole,
    ): Promise<void> {
      const isProjectAuthor = authorId === project.createdById;
      const authCollaborator = await this.repository.findByProjectAndUser(
        project.id,
        authorId,
      );
      const authCollaboratorProps = authCollaborator
        ? authCollaborator.toJson()
        : undefined;

      if (
        role &&
        role === CollaboratorRole.OWNER &&
        authorId !== project.createdById &&
        (!authCollaboratorProps ||
          authCollaboratorProps.role !== CollaboratorRole.OWNER)
      ) {
        throw new ForbiddenException('Usuário sem permissão');
      }

      const isProjectAdmin = authCollaboratorProps
        ? authCollaboratorProps.role === CollaboratorRole.ADMIN ||
          authCollaboratorProps.role === CollaboratorRole.OWNER
        : false;
      if (!isProjectAuthor && !isProjectAdmin) {
        throw new ForbiddenException('Usuário sem permissão');
      }
    }
  }
}
