"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schema/order.schema");
const products_service_1 = require("../products/products.service");
const users_service_1 = require("../users/users.service");
let OrderService = class OrderService {
    constructor(orderModel, productService, userService) {
        this.orderModel = orderModel;
        this.productService = productService;
        this.userService = userService;
    }
    async create(createOrderDto, userid) {
        const order = await new this.orderModel(createOrderDto);
        for (let item of order.items) {
            console.log(item, "itemitem");
            await this.productService.updateStock(item.product, item.quantity);
            const doc = await order.save();
            const user = await this.userService.findById(userid);
        }
        return order;
    }
    async findAll(_sort, _order, _page, _limit) {
        let query = this.orderModel.find({ deleted: { $ne: true } });
        let totalOrdersQuery = this.orderModel.find({ deleted: { $ne: true } });
        if (_sort && _order) {
            query = query.sort({ [_sort]: _order === 'asc' ? 1 : -1 });
        }
        const totalOrders = await this.orderModel.countDocuments(query);
        if (_page && _limit) {
            const pageSize = _limit;
            const page = _page;
            query = query.skip(pageSize * (page - 1)).limit(pageSize);
        }
        const orders = await query.exec();
        return { orders, totalOrders };
    }
    findOwn() {
        return '';
    }
    fetchOrdersByUserId(id) {
        return this.orderModel.find({ user: id });
    }
    update(id, updateOrderDto) {
        return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
    }
    remove(id) {
        return this.orderModel.findByIdAndDelete(id);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Orders.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, products_service_1.ProductsService, users_service_1.UsersService])
], OrderService);
//# sourceMappingURL=order.service.js.map