import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user/authenticated-user.decorator';
import { AuthenticatedUserModel } from 'src/domain/auth/models/authenticated-user.model';
import { JwtAuthGuard } from 'src/modules/auth/jwt/guards/jwt-auth.guard';
import { AddMemberRequestDto } from 'src/modules/teams/dtos/requests/add-member-request.dto';
import { TeamRequestDto } from 'src/modules/teams/dtos/requests/team-request.dto';
import { TeamResponse } from 'src/modules/teams/dtos/responses/team-response.dto';
import { TeamsService } from 'src/modules/teams/teams.service';

@Controller({
  version: '1',
  path: 'teams',
})
@UseGuards(JwtAuthGuard)
export class TeamsController {
  constructor(private readonly service: TeamsService) {}

  @Post()
  @ApiResponse({ type: TeamResponse.Dto })
  create(
    @AuthenticatedUser() authUser: AuthenticatedUserModel,
    @Body() data: TeamRequestDto,
  ) {
    return this.service.create(authUser, data);
  }

  @Post(':teamId/add-member')
  @ApiResponse({ type: TeamResponse.Dto })
  addMember(
    @AuthenticatedUser() authUser: AuthenticatedUserModel,
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Body() data: AddMemberRequestDto,
  ) {
    return this.service.addMember(authUser, teamId, data);
  }
}
