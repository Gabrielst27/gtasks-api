import { Entity, EntityProps } from 'src/common/entities/entity';

export type ProjectEntityProps = {
  name: string;
  description?: string;
  createdById: string;
  slug: string;
} & EntityProps;

export class ProjectEntity extends Entity<ProjectEntityProps> {
  constructor(props: ProjectEntityProps, id?: string) {
    //TODO: Create project entity validation
    props.description = props.description ?? '';
    super(props, id);
  }

  updateProps(partialProps: Partial<ProjectEntityProps>): ProjectEntity {
    //TODO: Create project entity validation
    const props = {
      ...this.props,
      ...partialProps,
    };
    super.updateProps(props);
    return this;
  }
}
