import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateJogoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  image_url: string;

  @IsOptional()
  @IsString()
  description: string;
}
