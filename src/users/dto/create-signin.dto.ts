import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";


export class CreateSigninDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 6,  
        minLowercase: 2,
        minSymbols: 1,
        minUppercase: 1,
        minNumbers: 3,})
    @MaxLength(20)
    password: string;
}