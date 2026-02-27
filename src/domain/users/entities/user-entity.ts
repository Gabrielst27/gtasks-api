import { Entity, EntityProps } from 'src/common/entities/entity';
import { Role } from 'src/domain/users/enum/role.enum';

export type UserEntityProps = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role?: Role;
  disabledAt?: Date;
} & EntityProps;

export class UserEntity extends Entity<UserEntityProps> {
  constructor(props: UserEntityProps, id?: string) {
    //TODO: Create user entity validation
    props.disabledAt = props.disabledAt ?? undefined;
    props.avatar = props.avatar ?? undefined;
    props.role = props.role || Role.USER;
    super(props, id);
  }

  updateProps(partialProps: Partial<UserEntityProps>): UserEntity {
    //TODO: Create user entity validation
    const props: UserEntityProps = {
      name: partialProps.name ?? this.props.name,
      email: partialProps.email ?? this.props.email,
      password: partialProps.password ?? this.props.password,
      avatar: partialProps.avatar ?? this.props.avatar,
      role: partialProps.role ?? this.props.role,
    };
    super.updateProps(props);
    return this;
  }
}
