import { Entity, EntityProps } from 'src/common/entities/entity';
import { MemberRole } from 'src/domain/teams/enums/member-role.enum';

export type TeamMemberProps = {
  userId: string;
  teamId: string;
  role?: MemberRole;
} & EntityProps;

export class TeamMemberEntity extends Entity<TeamMemberProps> {
  constructor(props: TeamMemberProps, id?: string) {
    props.role = props.role ?? MemberRole.MEMBER;
    super(props, id);
  }
}
