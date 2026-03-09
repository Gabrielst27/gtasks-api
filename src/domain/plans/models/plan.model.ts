import { Plan } from 'src/domain/plans/enums/plan.enum';

export type PlanModel = {
  name: Plan;
  id: string;
  projectsLimit: number;
  membersLimit: number;
};
