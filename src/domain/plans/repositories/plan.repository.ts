import { PlanModel } from 'src/domain/plans/models/plan.model';

export abstract class PlanRepository {
  abstract findById(id: string): Promise<PlanModel>;
}
