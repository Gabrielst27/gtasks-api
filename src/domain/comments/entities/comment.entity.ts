import { Entity, EntityProps } from 'src/common/entities/entity';

export type CommentEntityProps = {
  content: string;
  authorId: string;
  taskId: string;
} & EntityProps;

export class CommentEntity extends Entity<CommentEntityProps> {
  constructor(props: CommentEntityProps, id?: string) {
    super(props, id);
  }
}
