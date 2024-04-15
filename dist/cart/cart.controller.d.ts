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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    create(createCartDto: CreateCartDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/cart.schema").Cart> & import("./schema/cart.schema").Cart & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(req: any): import("mongoose").Query<Omit<import("mongoose").Document<unknown, {}, import("./schema/cart.schema").Cart> & import("./schema/cart.schema").Cart & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[], import("mongoose").Document<unknown, {}, import("./schema/cart.schema").Cart> & import("./schema/cart.schema").Cart & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./schema/cart.schema").Cart, "find">;
    resetCart(req: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/cart.schema").Cart> & import("./schema/cart.schema").Cart & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateCartDto: UpdateCartDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/cart.schema").Cart> & import("./schema/cart.schema").Cart & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/cart.schema").Cart> & import("./schema/cart.schema").Cart & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
