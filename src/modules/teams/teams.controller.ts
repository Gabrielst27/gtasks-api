import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user/authenticated-user.decorator';
import { AuthenticatedUserDto } from 'src/modules/auth/dtos/authenticated-user.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt/guards/jwt-auth.guard';
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
    @AuthenticatedUser() authUser: AuthenticatedUserDto,
    @Body() data: TeamRequestDto,
  ) {
    return this.service.create(authUser, data);
  }
}
