import { validateSync } from 'class-validator';

export abstract class ClassValidator {
  public errors: {
    [field: string]: string[];
  };

  validate(data: any): boolean {
    const errors = validateSync(data);

    if (errors.length) {
      this.errors = {};
      for (const error of errors) {
        if (error.constraints)
          this.errors[error.property] = Object.values(error.constraints);
      }
      return false;
    }
    return true;
  }
}
