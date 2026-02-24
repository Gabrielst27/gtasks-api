import { Project } from 'generated/prisma/client';
import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { ProjectEntity } from 'src/domain/projects/entities/project.entity';

export class ProjectPrismaModelMapper {
  static toEntity(model: Project): ProjectEntity {
    return new ProjectEntity(
      {
        name: model.name,
        description: model.description || undefined,
        createdById: model.createdById,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
        slug: model.slug,
      },
      model.id,
    );
  }

  static toModel(entity: ProjectEntity): Project {
    const json = entity.toJson();
    return {
      id: json.id,
      name: json.name,
      description: json.description,
      slug: json.slug,
      createdById: json.createdById,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    };
  }

  static enumToOperator(opEnum: EDbOperators) {
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
