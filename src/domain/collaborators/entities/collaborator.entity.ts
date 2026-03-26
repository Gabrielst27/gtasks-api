import { Entity, EntityProps } from 'src/common/entities/entity';
import { CollaboratorRole } from 'src/domain/collaborators/enums/collaborator-role.enum';

export type CollaboratorEntityProps = {
  role?: CollaboratorRole;
  userId: string;
  projectId: string;
} & EntityProps;

export class CollaboratorEntity extends Entity<CollaboratorEntityProps> {
  constructor(props: CollaboratorEntityProps, id?: string) {
    //TODO: implement collaborator entity validation
    props.role = props.role ?? CollaboratorRole.VIEWER;
    super(props, id);
  }
}
