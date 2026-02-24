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
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SearchManyRequestDto } from 'src/common/dtos/requests/search-many-request.dto';
import { SearchResult } from 'src/common/repositories/search-result';
import { CreateTaskRequestDto } from 'src/modules/tasks/dtos/requests/create-task-request.dto';
import { TaskRequestDto } from 'src/modules/tasks/dtos/requests/task-request.dto';
import { TaskResponse } from 'src/modules/tasks/dtos/responses/task-response.dto';
import { TasksService } from 'src/modules/tasks/tasks.service';

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks',
})
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
  create(@Body() data: CreateTaskRequestDto) {
    return this.service.create('cb69b14f-55fb-4a26-a4bb-2ed08b1c24df', data);
  }

  @Put(':id')
  @ApiResponse({ type: TaskResponse.Dto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() data: TaskRequestDto) {
    return this.service.update(id, data);
  }
}
