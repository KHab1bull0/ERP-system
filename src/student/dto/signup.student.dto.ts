import { IsBoolean, IsOptional, IsString, isString } from "class-validator";


export class SignupStudentDto {

    @IsString()
    firstname: string;

    @IsString()
    @IsOptional()
    lastname: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    phone: string;

    @IsString()
    @IsOptional()
    photo_url: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean = false;

    @IsString()
    @IsOptional()
    group_id: string;
}