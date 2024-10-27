import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'email.example.com' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'yourpassword' })
  password: string;
}
