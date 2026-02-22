import { Role, User } from 'generated/prisma/client';
import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { UserEntity } from 'src/domain/users/entities/user-entity';
import { Role as AppRole } from 'src/domain/users/enum/role.enum';

export class UserPrismaModelMapper {
  static toEntity(model: User): UserEntity {
    const entity = new UserEntity(
      {
        ...model,
        role: UserPrismaModelMapper.roleToAppEnum(model.role),
        avatar: model.avatar ?? undefined,
      },
      model.id,
    );
    return entity;
  }

  static toModel(entity: UserEntity): User {
    const json = entity.toJson();
    return {
      ...json,
      role: UserPrismaModelMapper.roleToModelEnum(json.role),
    };
  }

  static roleToAppEnum(role: Role): AppRole {
    const mapper = {
      USER: AppRole.USER,
      ADMIN: AppRole.ADMIN,
    };
    return mapper[role];
  }

  static roleToModelEnum(role: AppRole): Role {
    const mapper = {
      user: Role.USER,
      admin: Role.ADMIN,
    };
    return mapper[role];
  }

  static operatorToModelEnum(opEnum: EDbOperators) {
    const mapper = {
      equal: 'equals',
      in: 'in',
      not_in: 'notin',
      lesser_than: 'lt',
      lesser_than_or_equal: 'lte',
      greater_than: 'gt',
      greater_than_or_equal: 'gte',
      not: 'not',
      contains: 'contains',
    };
    return mapper[opEnum];
  }
}
