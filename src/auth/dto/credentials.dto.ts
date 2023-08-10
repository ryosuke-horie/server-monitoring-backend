import { IsString, MaxLength, MinLength, IsNotEmpty } from "class-validator";

export class CredentialsDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string;
}