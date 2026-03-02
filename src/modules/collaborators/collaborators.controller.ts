import { Controller } from '@nestjs/common';

@Controller({
  version: '1',
  path: 'projects/:projectId/collaborators',
})
export class CollaboratorsController {}
