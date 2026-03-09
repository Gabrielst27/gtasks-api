import { Entity, EntityProps } from 'src/common/entities/entity';
import { Plan } from 'src/domain/teams/enums/plan.enum';

export type TeamEntityProps = {
  name: string;
  slug: string;
  plan: Plan;
  planId: string;
  createdById: string;
  disabledAt?: Date;
} & EntityProps;

export class TeamEntity extends Entity<TeamEntityProps> {
  constructor(props: TeamEntityProps, id?: string) {
    //TODO: implement team entity validation
    props.disabledAt = props.disabledAt ?? undefined;
    super(props, id);
  }
}
