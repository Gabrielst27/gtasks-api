import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export namespace Token {
  type Props = {
    token: string;
  };

  export class Dto implements Props {
    @ApiProperty({ description: 'Sub do token' })
    @IsNotEmpty()
    token: string;
    //TODO: implement token dto
    constructor(props: Props) {
      this.token = props.token;
    }
  }

  export class Mapper {
    static mapToToken(token: string): Dto {
      const props = { token };
      return new Dto(props);
    }
  }
}
