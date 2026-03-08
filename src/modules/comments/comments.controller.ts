import { Controller } from '@nestjs/common';

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks/:taskId/comments',
})
export class CommentsController {}
