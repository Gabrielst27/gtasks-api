import { BadRequestException } from '@nestjs/common';

export abstract class Repository {
  protected get searchableFields(): string[] {
    return ['createdAt', 'updatedAt'];
  }

  protected get sortableFields(): string[] {
    return ['createdAt', 'updatedAt'];
  }

  validateSearchFields(fields: string[]): void {
    let isValid = true;
    fields.forEach((field) => {
      if (!this.searchableFields.includes(field)) {
        isValid = false;
      }
    });
    if (!isValid) {
      throw new BadRequestException('Campos de busca inválidos');
    }
  }

  validateSortField(field: string): void {
    const isValid = this.sortableFields.includes(field);
    if (!isValid) {
      throw new BadRequestException('Campos de ordenação inválidos');
    }
  }
}
