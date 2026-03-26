import { PlanModel } from 'src/domain/plans/models/plan.model';
import { PlanRepository } from 'src/domain/plans/repositories/plan.repository';

import * as fs from 'node:fs';
import * as path from 'node:path';

export class PlansJsonRepository extends PlanRepository {
  private jsonPlans: Record<string, Omit<PlanModel, 'id'>>;
  private readonly STARTER_PLAN_ID = '65eb6bc8-c2b5-4338-b6c3-df72ae8f06c3';

  constructor() {
    super();

    const filePath = path.resolve(process.cwd(), 'plan.settings.json');

    const file = fs.readFileSync(filePath, 'utf-8');

    this.jsonPlans = JSON.parse(file) as Record<string, Omit<PlanModel, 'id'>>;
  }

  getStarterPlanId(): string {
    return this.STARTER_PLAN_ID;
  }

  async findById(id: string): Promise<PlanModel> {
    const normalizedId = id.trim().toLowerCase();
    const plan = this.jsonPlans.plans[normalizedId];

    if (!plan) {
      throw new Error(`Plano não encontrado`);
    }

    return { id: normalizedId, ...plan };
  }
}
