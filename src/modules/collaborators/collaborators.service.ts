import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { SearchResult } from 'src/common/repositories/search-result';
import { ICollaboratorRepository } from 'src/domain/collaborators/repositories/collaborator.repository';
import { AuthenticatedUserDto } from 'src/modules/auth/dtos/authenticated-user.dto';
import { AddCollaboratorRequestDto } from 'src/modules/collaborators/dtos/requests/add-collaborator-request.dto';
import { CollaboratorResponse } from 'src/modules/collaborators/dtos/responses/collaborator-response.dto';
import { AddCollaborator } from 'src/modules/collaborators/usecases/add.usecase';
import { SearchCollaborators } from 'src/modules/collaborators/usecases/search.usecase';

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

  async findAll(
    authUser: AuthenticatedUserDto,
    projectId: string,
    params: SearchManyRequestDto,
  ): Promise<SearchResult<CollaboratorResponse.Dto>> {
    if (!authUser.token)
      throw new UnauthorizedException('Usuário não autenticado');
    const search = new SearchCollaborators.UseCase(this.repository);
    return await search.execute({ projectId, searchProps: params });
  }
}
