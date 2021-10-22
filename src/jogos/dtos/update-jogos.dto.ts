import { IsOptional } from 'class-validator';

export class UpdateJogoDto {
  @IsOptional()
  title: string;

  @IsOptional()
  image_url: string;

  @IsOptional()
  description: string;
}
