import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 carcateres' })
  @MaxLength(32, { message: 'A senha deve ter no maximo 32 carcateres' })
  @IsString({ message: 'Informe uma senha valida' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A Senha deve conter pelo menos uma letra maiuscula, uma letra minuscula, um numero e um caracter especial.',
  })
  password: string;

  @IsNotEmpty({ message: 'Informe a confirmacao da senha' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 carcateres' })
  @MaxLength(32, { message: 'A senha deve ter no maximo 32 carcateres' })
  @IsString({ message: 'Informe uma senha valida' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A Senha deve conter pelo menos uma letra maiuscula, uma letra minuscula, um numero e um caracter especial.',
  })
  passwordConfirmation: string;
}
