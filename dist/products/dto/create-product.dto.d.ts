import { User } from 'src/users/entities/user.entity';
export declare class CreateProductDto {
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    colors: any;
    sizes: any;
    highlights: string[];
    discountPrice: number;
    deleted: boolean;
    readonly user: User;
}
