import { IsBoolean, IsString, isString } from "class-validator";


export class SignupStudentDto {

    @IsString()
    firstname: string;

    @IsString()
    lastname: string = '';

    @IsString()
    email: string = '';

    @IsString()
    password: string;

    @IsString()
    phone: string;

    @IsString()
    photo_url: string = '';

    @IsBoolean()
    isActive: boolean = false;

    @IsString()
    group_id: string = '';
}