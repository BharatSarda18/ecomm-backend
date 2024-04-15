import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCartDto {
    @IsString()
    @IsNotEmpty()
    product:string;
    
    @IsNumber()
    quantity:number;
}
