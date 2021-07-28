import { ApiHideProperty } from '@nestjs/swagger';

export class User {
  email: string;
  @ApiHideProperty()
  password: string;
  name?: string | null;
}
