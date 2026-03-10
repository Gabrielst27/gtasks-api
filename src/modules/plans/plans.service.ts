import { Injectable } from '@nestjs/common';
import { PlanModel } from 'src/domain/plans/models/plan.model';
import { PlanRepository } from 'src/domain/plans/repositories/plan.repository';

@Injectable()
export class PlansService {
  constructor(private readonly repository: PlanRepository) {}
  async findByTeam(teamId: string): Promise<PlanModel> {
    return await this.repository.findById(teamId);
  }

  getStarterPlanId(): string {
    return this.repository.getStarterPlanId();
  }
}
