/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './schema/cart.schema';
import { Model } from 'mongoose';
export declare class CartService {
    private cartModel;
    constructor(cartModel: Model<Cart>);
    create(createCartDto: CreateCartDto, id: any): Promise<import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    resetCartService(id: string): Promise<import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(id: number): import("mongoose").Query<Omit<import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[], import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Cart, "find">;
    update(id: string, updateCartDto: UpdateCartDto): Promise<import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
