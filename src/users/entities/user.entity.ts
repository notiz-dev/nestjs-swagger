import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  email: string;
  password: string;
  @ApiProperty({ required: false, nullable: true })
  name?: string | null;
}
