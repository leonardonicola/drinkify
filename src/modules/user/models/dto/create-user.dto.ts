import { Length, IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @Length(3, 50)
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minUppercase: 1,
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: 'Senha muito fraca!' },
  )
  password: string;
}
