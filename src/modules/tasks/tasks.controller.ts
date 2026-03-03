import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import { AuthenticatedUserDto } from 'src/modules/auth/dtos/authenticated-user.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt/guards/jwt-auth.guard';
import { ProjectIdRequestDto } from 'src/modules/tasks/dtos/requests/project-id-request.dto';
import { TaskRequestDto } from 'src/modules/tasks/dtos/requests/task-request.dto';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { TasksService } from 'src/modules/tasks/tasks.service';

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks',
})
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private service: TasksService) {}

  @Get(':id')
  @ApiResponse({ type: TaskResponse.Dto })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get()
  @ApiResponse({ type: SearchResult<TaskResponse.Dto> })
  findAllByProject(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Query() params: SearchManyRequestDto,
  ) {
    return this.service.findAllByProject(projectId, params);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    type: TaskResponse.Dto,
  })
  create(
    @AuthenticatedUser() authUser: AuthenticatedUserDto,
    @Param() params: ProjectIdRequestDto,
    @Body() data: TaskRequestDto,
  ) {
    return this.service.create(authUser, params.projectId, data);
  }

  @Put(':id')
  @ApiResponse({ type: TaskResponse.Dto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() data: TaskRequestDto) {
    return this.service.update(id, data);
  }
}
