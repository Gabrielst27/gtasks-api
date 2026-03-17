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
import { CommentsService } from 'src/modules/comments/comments.service';
import { CommentRequestDto } from 'src/modules/comments/dto/requests/comments-request.dto';
import { CommentsResponse } from 'src/modules/comments/dto/responses/comments-response.dto';

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks/:taskId/comments',
})
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Post()
  @ApiResponse({ type: CommentsResponse.Dto })
  create(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @AuthenticatedUser() authUser: AuthenticatedUserModel,
    @Body() data: CommentRequestDto,
  ) {
    return this.service.create(authUser, taskId, data);
  }
}
