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
import { CreateUserRequestDto } from 'src/modules/users/dtos/requests/create-user-request.dto';
import { UserRequestDto } from 'src/modules/users/dtos/requests/user-request.dto';
import { UserResponse } from 'src/modules/users/dtos/responses/user-response.dto';
import { UsersService } from 'src/modules/users/users.service';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private service: UsersService) {}

  @Get(':id')
  @ApiResponse({
    type: UserResponse.Dto,
  })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Get()
  @ApiResponse({
    type: SearchResult<UserResponse.Dto>,
  })
  findAll(@Query() params: SearchManyRequestDto) {
    return this.service.findAll(params);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    type: UserResponse.Dto,
  })
  create(@Body() data: CreateUserRequestDto) {
    return this.service.create(data);
  }

  @Put(':id')
  @ApiResponse({
    type: UserResponse.Dto,
  })
  update(@Param('id') id: string, @Body() data: UserRequestDto) {
    return this.service.update(id, data);
  }
}
