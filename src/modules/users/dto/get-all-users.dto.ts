import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllUsersDTO {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  sortBy: string;
}
