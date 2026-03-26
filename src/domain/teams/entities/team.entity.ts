import { Entity, EntityProps } from 'src/common/entities/entity';
import { Plan } from 'src/domain/plans/enums/plan.enum';

export type TeamEntityProps = {
  name: string;
  slug: string;
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
