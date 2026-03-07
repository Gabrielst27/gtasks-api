import { Module } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsController } from './collaborators.controller';
import { CollaboratorPrismaRepository } from 'src/modules/collaborators/repositories/collaborator-prisma.repository';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { ProjectsModule } from 'src/modules/projects/projects.module';
import { ProjectsService } from 'src/modules/projects/projects.service';
import { CollaboratorRepository } from 'src/domain/collaborators/repositories/collaborator.repository';

@Module({
  imports: [ProjectsModule],
  providers: [
    PrismaService,
    {
      provide: 'Repository',
      useFactory: (prismaService: PrismaService) => {
        return new CollaboratorPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: CollaboratorsService,
      useFactory: (
        repository: CollaboratorRepository,
        projectsService: ProjectsService,
      ) => {
        return new CollaboratorsService(repository, projectsService);
      },
      inject: ['Repository', ProjectsService],
    },
  ],
  controllers: [CollaboratorsController],
})
export class CollaboratorsModule {}
