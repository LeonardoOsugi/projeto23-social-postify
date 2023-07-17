import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class PublicationDTO {
    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    @MaxLength(10)
    @IsDateString()
    dateToPublish: string;   

    @IsString()
    @IsNotEmpty()
    socialMedia: string;  
}