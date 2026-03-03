import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { IUseCase } from 'src/common/usecases/usecase.interface';
import { CollaboratorEntity } from 'src/domain/collaborators/entities/collaborator.entity';
import { CollaboratorRole } from 'src/domain/collaborators/enums/collaborator-role.enum';
import { ICollaboratorRepository } from 'src/domain/collaborators/repositories/collaborator.repository';
import { AuthenticatedUserDto } from 'src/modules/auth/dtos/authenticated-user.dto';
import { CollaboratorResponse } from 'src/modules/collaborators/dtos/responses/collaborator-response.dto';

export namespace AddCollaborator {
  export type Input = {
    authUser: AuthenticatedUserDto;
    userId: string;
    projectId: string;
    role?: CollaboratorRole;
  };

  export type Output = CollaboratorResponse.Dto;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly repository: ICollaboratorRepository) {}

    async execute(input: Input): Promise<CollaboratorResponse.Dto> {
      const { authUser, userId, projectId } = input;
      if (!authUser) {
        throw new UnauthorizedException('Usuário não autenticado');
      }
      if (!userId || !projectId) {
        throw new BadRequestException('Dados inválidos');
      }
      const entity = new CollaboratorEntity({ userId, projectId });
      const result = await this.repository.create(entity);
      return CollaboratorResponse.Mapper.toResponse(result);
    }
  }
}
