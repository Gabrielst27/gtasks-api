import {
  IsAlpha,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { AppQueryProps } from 'src/common/utils/app-queries/app-query';
import { ClassValidator } from 'src/common/validators/class-validator';

class AppQueryRules {
  @IsNotEmpty()
  @IsAlpha()
  field: string;

  @IsOptional()
  @IsString()
  value: string | null;

  @IsNotEmpty()
  @IsEnum(EDbOperators)
  operator: EDbOperators;

  constructor(props: AppQueryProps) {
    Object.assign(this, props);
  }
}

export class AppQueryValidator extends ClassValidator {
  validate(data: AppQueryProps): boolean {
    return super.validate(new AppQueryRules(data));
  }
}

export class AppQueryValidatorFactory {
  static create(): AppQueryValidator {
    return new AppQueryValidator();
  }
}
