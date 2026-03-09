import { Injectable } from '@nestjs/common';
import { PlanModel } from 'src/domain/plans/models/plan.model';
import { PlanRepository } from 'src/domain/plans/repositories/plan.repository';

@Injectable()
export class PlansService {
  constructor(private readonly repository: PlanRepository) {}
  async findByTeam(authTeam: any): Promise<PlanModel> {
    return await this.repository.findById(
      '65eb6bc8-c2b5-4338-b6c3-df72ae8f06c3',
    );
  }
}
