import { Injectable } from '@nestjs/common';
import { ICollaboratorRepository } from 'src/domain/collaborators/repositories/collaborator.repository';
import { AuthenticatedUserDto } from 'src/modules/auth/dtos/authenticated-user.dto';
import { AddCollaboratorRequestDto } from 'src/modules/collaborators/dtos/requests/add-collaborator-request.dto';
import { CollaboratorResponse } from 'src/modules/collaborators/dtos/responses/collaborator-response.dto';
import { AddCollaborator } from 'src/modules/collaborators/usecases/add.usecase';

@Injectable()
export class CollaboratorsService {
  constructor(private readonly repository: ICollaboratorRepository) {}

  async add(
    author: AuthenticatedUserDto,
    projectId: string,
    data: AddCollaboratorRequestDto,
  ): Promise<CollaboratorResponse.Dto> {
    const usecase = new AddCollaborator.UseCase(this.repository);
    return await usecase.execute({ ...data, authUser: author, projectId });
  }
}
