import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { SharedModule } from 'src/modules/shared/shared.module';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { ProjectsPrismaRepository } from 'src/modules/projects/repositories/prisma/projects-prisma.repository';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ProjectRepository } from 'src/domain/projects/repositories/projects.repository';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    {
      provide: 'Repository',
      useFactory: (prismaService: PrismaService) => {
        return new ProjectsPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: ProjectsService,
      useFactory: (repository: ProjectRepository, authService: AuthService) => {
        return new ProjectsService(repository, authService);
      },
      inject: ['Repository', AuthService],
    },
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
