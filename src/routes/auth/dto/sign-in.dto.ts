import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	@Length(8, 50)
	password: string;
}
