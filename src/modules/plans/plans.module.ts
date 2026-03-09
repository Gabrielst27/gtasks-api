import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlanRepository } from 'src/domain/plans/repositories/plan.repository';
import { PlansJsonRepository } from 'src/modules/plans/repositories/json/plans-json.repository';

@Module({
  providers: [
    {
      provide: 'Repository',
      useClass: PlansJsonRepository,
    },
    {
      provide: PlansService,
      useFactory: (repository: PlanRepository) => {
        return new PlansService(repository);
      },
      inject: ['Repository'],
    },
  ],
  exports: [PlansService],
})
export class PlansModule {}
