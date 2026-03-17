import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user/authenticated-user.decorator';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { SearchResult } from 'src/common/repositories/search-result';
import { AuthenticatedUserModel } from 'src/domain/auth/models/authenticated-user.model';
import { JwtAuthGuard } from 'src/modules/auth/jwt/guards/jwt-auth.guard';
import { FindProjectBySlugRequestDto } from 'src/modules/projects/dtos/requests/find-by-slug-request.dto';
import { ProjectRequestDto } from 'src/modules/projects/dtos/requests/project-request.dto';
import { ProjectResponse } from 'src/modules/projects/dtos/responses/project-response.dto';
import { ProjectsService } from 'src/modules/projects/projects.service';

@Controller({
  version: '1',
  path: 'teams/:teamId/projects',
})
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @ApiResponse({
    type: [SearchResult<ProjectResponse.Dto>],
  })
  findAll(@Query() searchParams: SearchManyRequestDto) {
    return this.projectsService.findAll(searchParams);
  }

  @Get('by-id/:id')
  @ApiResponse({
    type: ProjectResponse.Dto,
  })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findById(id);
  }

  @Get('by-slug/:slug')
  @ApiResponse({
    type: ProjectResponse.Dto,
  })
  findOne(@Param() params: FindProjectBySlugRequestDto) {
    return this.projectsService.findBySlug(params.slug);
  }

  @Post()
  @ApiResponse({
    type: ProjectResponse.Dto,
  })
  create(
    @AuthenticatedUser() authUser: AuthenticatedUserModel,
    @Param('teamId') teamId: string,
    @Body() data: ProjectRequestDto,
  ) {
    return this.projectsService.create(authUser, teamId, data);
  }

  @Put(':id')
  @ApiResponse({
    type: ProjectResponse.Dto,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Body() data: ProjectRequestDto,
    @AuthenticatedUser() authUser: AuthenticatedUserModel,
  ) {
    return this.projectsService.update(id, data, authUser, teamId);
  }

  // @Delete()
  // @HttpCode(HttpStatus.NO_CONTENT)
  // delete(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.projectsService.delete(id);
  // }
}
