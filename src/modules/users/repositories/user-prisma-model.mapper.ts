import { User } from 'generated/prisma/client';
import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { UserEntity } from 'src/domain/users/entities/user-entity';

export class UserPrismaModelMapper {
  static toEntity(model: User): UserEntity {
    const entity = new UserEntity(
      {
        ...model,
        avatar: model.avatar ?? undefined,
        disabledAt: model.disabledAt ?? undefined,
      },
      model.id,
    );
    return entity;
  }

  static toModel(entity: UserEntity): User {
    const json = entity.toJson();
    return {
      ...json,
      avatar: json.avatar || null,
      disabledAt: json.disabledAt || null,
    };
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
