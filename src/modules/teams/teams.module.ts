import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PlansModule } from 'src/modules/plans/plans.module';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { TeamsPrismaRepository } from 'src/modules/teams/repositories/prisma/teams-prisma.repository';
import { TeamRepository } from 'src/domain/teams/repositories/team.repository';
import { PlansService } from 'src/modules/plans/plans.service';
import { PrismaModule } from 'src/modules/shared/prisma/prisma.module';

@Module({
  imports: [PlansModule, PrismaModule],
  providers: [
    PrismaService,
    {
      provide: 'Repository',
      useFactory: (prismaService: PrismaService) => {
        return new TeamsPrismaRepository(prismaService);
      },
      inject: [PrismaService],
    },
    {
      provide: TeamsService,
      useFactory: (plansService: PlansService, repository: TeamRepository) => {
        return new TeamsService(plansService, repository);
      },
      inject: [PlansService, 'Repository'],
    },
  ],
  controllers: [TeamsController],
  exports: [TeamsService],
})
export class TeamsModule {}
