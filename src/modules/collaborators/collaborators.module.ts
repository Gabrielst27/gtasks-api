import { Module } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsController } from './collaborators.controller';
import { ICollaboratorRepository } from 'src/domain/collaborators/repositories/collaborator.repository';
import { CollaboratorPrismaRepository } from 'src/modules/collaborators/repositories/collaborator-prisma.repository';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';

@Module({
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
      useFactory: (repository: ICollaboratorRepository) => {
        return new CollaboratorsService(repository);
      },
      inject: ['Repository'],
    },
  ],
  controllers: [CollaboratorsController],
})
export class CollaboratorsModule {}
