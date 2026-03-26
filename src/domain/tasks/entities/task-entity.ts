import { Entity, EntityProps } from 'src/common/entities/entity';
import { TaskPriority } from 'src/domain/tasks/enums/priority';
import { TaskStatus } from 'src/domain/tasks/enums/status';

export type TaskEntityProps = {
  title: string;
  description?: string;
  slug: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date;
  projectId: string;
  createdById: string;
  assigneeId: string;
} & EntityProps;

export class TaskEntity extends Entity<TaskEntityProps> {
  constructor(props: TaskEntityProps, id?: string) {
    //TODO: implement task entity validation
    props.description = props.description ?? '';
    props.status = props.status ?? TaskStatus.TO_DO;
    props.priority = props.priority ?? TaskPriority.LOW;
    super(props, id);
  }

  updateProps(partialProps: Partial<TaskEntityProps>): void {
    //TODO: implement task entity validation
    const props = {
      ...this.props,
      ...partialProps,
    };
    super.updateProps(props);
  }
}
