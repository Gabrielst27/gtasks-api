export namespace Payload {
  type Props = {
    sub: string;
  };

  export class Mapper {
    static mapToResponse(id: string): Props {
      return {
        sub: id,
      };
    }
  }
}
