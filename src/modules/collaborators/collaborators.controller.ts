import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user/authenticated-user.decorator';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { SearchResult } from 'src/common/repositories/search-result';
import { AuthenticatedUserDto } from 'src/modules/auth/dtos/authenticated-user.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt/guards/jwt-auth.guard';
import { CollaboratorsService } from 'src/modules/collaborators/collaborators.service';
import { AddCollaboratorRequestDto } from 'src/modules/collaborators/dtos/requests/add-collaborator-request.dto';
import { CollaboratorResponse } from 'src/modules/collaborators/dtos/responses/collaborator-response.dto';

@Controller({
  version: '1',
  path: 'projects/:projectId/collaborators',
})
@UseGuards(JwtAuthGuard)
export class CollaboratorsController {
  constructor(private readonly service: CollaboratorsService) {}

  @Post()
  @ApiResponse({
    type: CollaboratorResponse.Dto,
  })
  add(
    @AuthenticatedUser() author: AuthenticatedUserDto,
    @Param('projectId', ParseUUIDPipe) projectId,
    @Body() data: AddCollaboratorRequestDto,
  ) {
    return this.service.add(author, projectId, data);
  }

  @Get()
  @ApiResponse({ type: SearchResult<CollaboratorResponse.Dto> })
  findAllByProject(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Query() params: SearchManyRequestDto,
    @AuthenticatedUser() authUser: AuthenticatedUserDto,
  ) {
    return this.service.findAll(authUser, projectId, params);
  }
}
