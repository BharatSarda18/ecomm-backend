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
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { Orders } from './schema/order.schema';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
export declare class OrderService {
    private orderModel;
    private readonly productService;
    private readonly userService;
    constructor(orderModel: Model<Orders>, productService: ProductsService, userService: UsersService);
    create(createOrderDto: CreateOrderDto, userid: string): Promise<import("mongoose").Document<unknown, {}, Orders> & Orders & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(_sort: string, _order: string, _page: number, _limit: number): Promise<{
        orders: (import("mongoose").Document<unknown, {}, Orders> & Orders & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        totalOrders: number;
    }>;
    findOwn(): string;
    fetchOrdersByUserId(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Orders> & Orders & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, Orders> & Orders & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Orders, "find">;
    update(id: string, updateOrderDto: UpdateOrderDto): import("mongoose").Query<import("mongoose").Document<unknown, {}, Orders> & Orders & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, Orders> & Orders & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Orders, "findOneAndUpdate">;
    remove(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Orders> & Orders & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, Orders> & Orders & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Orders, "findOneAndDelete">;
}
