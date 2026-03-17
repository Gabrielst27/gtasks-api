import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { SharedModule } from 'src/modules/shared/shared.module';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { ProjectsPrismaRepository } from 'src/modules/projects/repositories/prisma/projects-prisma.repository';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ProjectRepository } from 'src/domain/projects/repositories/projects.repository';
import { PermissionsModule } from 'src/modules/permissions/permissions.module';
import { PermissionsFactory } from 'src/modules/permissions/permissions';

@Module({
  imports: [SharedModule, AuthModule, PermissionsModule],
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    PermissionsFactory,
    {
      provide: 'Repository',
      useFactory: (prismaService: PrismaService) => {
        return new ProjectsPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: ProjectsService,
      useFactory: (
        repository: ProjectRepository,
        authService: AuthService,
        permissionsFactory: PermissionsFactory,
      ) => {
        return new ProjectsService(repository, authService, permissionsFactory);
      },
      inject: ['Repository', AuthService, PermissionsFactory],
    },
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
