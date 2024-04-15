import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @Min(1)
    @Max(1000000)
    @IsOptional()
    price: number;

    @Min(1)
    @Max(99)
    @IsOptional()
    discountPercentage:number;

    @Min(1)
    @Max(5)
    @IsOptional()
    rating:number;

    @Min(0)
    @IsOptional()
    stock:number;

    @IsString()
    @IsNotEmpty()
    brand:string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    thumbnail: string;

    images: string[];

    @IsOptional()
    colors:any;

    @IsOptional()
    sizes:any;

    @IsOptional()
    highlights: string[];

    @IsOptional()
    discountPrice: number;

    @IsOptional()
    deleted: boolean;

    @IsEmpty({message:"You can not pass user id"})
    readonly user:User;
}
