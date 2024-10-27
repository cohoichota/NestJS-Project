import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'email.example.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'your password' })
  password: string;

  @IsOptional()
  @ApiProperty({ example: 'your name' })
  name: string;
}
