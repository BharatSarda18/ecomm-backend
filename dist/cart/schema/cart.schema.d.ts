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
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/schema/product.schema';
import { Users } from 'src/users/schema/users.schema';
export type CartDocument = HydratedDocument<Cart>;
export declare class Cart {
    quantity: number;
    product: Product;
    user: Users;
    size: mongoose.Schema.Types.Mixed;
    color: mongoose.Schema.Types.Mixed;
}
declare const CartSchema: mongoose.Schema<Cart, mongoose.Model<Cart, any, any, any, mongoose.Document<unknown, any, Cart> & Cart & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Cart, mongoose.Document<unknown, {}, mongoose.FlatRecord<Cart>> & mongoose.FlatRecord<Cart> & {
    _id: mongoose.Types.ObjectId;
}>;
export { CartSchema };
