import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCartDto {

    @IsNumber()
    quantity:string;
}
