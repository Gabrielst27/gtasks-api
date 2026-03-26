import { EDbOperators } from 'src/common/enum/db-operators.enum';
import { AppQueryProps } from 'src/common/utils/app-queries/app-query';

export function makeQueryProps(
  field: string,
  value: string | null,
  operator?: EDbOperators,
): AppQueryProps {
  const op = operator ?? EDbOperators.EQUALS;
  const props = {
    field,
    value,
    operator: op,
  };
  return props;
}
