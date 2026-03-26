import { forwardRef, Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PlansModule } from 'src/modules/plans/plans.module';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { TeamsPrismaRepository } from 'src/modules/teams/repositories/prisma/teams-prisma.repository';
import { TeamRepository } from 'src/domain/teams/repositories/team.repository';
import { PrismaModule } from 'src/modules/shared/prisma/prisma.module';
import { AddMember } from 'src/modules/teams/usecases/add-member.usecase';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CreateTeam } from 'src/modules/teams/usecases/create.usecase';
import { FindTeamByUser } from 'src/modules/teams/usecases/find-by-user.usecase';

@Module({
  imports: [PlansModule, PrismaModule, forwardRef(() => AuthModule)],
  providers: [
    PrismaService,
    TeamsService,
    {
      provide: 'Repository',
      useFactory: (prismaService: PrismaService) => {
        return new TeamsPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: AddMember.UseCase,
      useFactory: (repository: TeamRepository) => {
        return new AddMember.UseCase(repository);
      },
      inject: ['Repository'],
    },
    {
      provide: CreateTeam.UseCase,
      useFactory: (repository: TeamRepository) => {
        return new CreateTeam.UseCase(repository);
      },
      inject: ['Repository'],
    },
    {
      provide: FindTeamByUser.UseCase,
      useFactory: (repository: TeamRepository) => {
        return new FindTeamByUser.UseCase(repository);
      },
      inject: ['Repository'],
    },
  ],
  controllers: [TeamsController],
  exports: [TeamsService],
})
export class TeamsModule {}
