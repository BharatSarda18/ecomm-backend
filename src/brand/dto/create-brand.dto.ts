import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto {

    @IsString()
    @IsNotEmpty()
    label: string;

    @IsNotEmpty()
    @IsString()
    value: string;
}
