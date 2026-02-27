import { v4 } from 'uuid';

export type EntityProps = {
  createdAt?: Date;
  updatedAt?: Date;
};

export abstract class Entity<Props extends EntityProps> {
  private readonly _id: string;
  private _props: Props;

  constructor(props: Props, id?: string) {
    this._id = id || v4();
    props.createdAt = props.createdAt || new Date();
    props.updatedAt = props.updatedAt || new Date();
    this._props = props;
  }

  protected get props(): Props {
    return this._props;
  }

  updateProps(props: Omit<Props, 'createdAt' | 'updatedAt'>) {
    this._props = {
      ...this._props,
      ...props,
      updatedAt: new Date(),
    };
  }

  toJson(): Required<{ id: string } & Props> {
    return { id: this._id, ...this._props } as Required<
      {
        id: string;
      } & Props
    >;
  }
}
