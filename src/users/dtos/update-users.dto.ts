import { UserRole } from '../user-roles.enum';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateDto {
  @IsOptional()
  @IsString({ message: 'Informe um nome de usuario valido' })
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Informe um email valido' })
  email: string;

  @IsOptional()
  role: UserRole;

  @IsOptional()
  status: boolean;
}
