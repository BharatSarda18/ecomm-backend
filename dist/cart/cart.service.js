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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cart_schema_1 = require("./schema/cart.schema");
const mongoose_2 = require("mongoose");
let CartService = class CartService {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    async create(createCartDto, id) {
        const cart = await new this.cartModel({ ...createCartDto, user: id });
        return cart.save();
    }
    async resetCartService(id) {
        console.log(id, 'idfordelete');
        const cart = await this.cartModel.findOne({ user: id });
        const deletedcart = await this.cartModel.findByIdAndDelete(cart._id);
        return cart;
    }
    findAll(id) {
        return this.cartModel.find({ user: id }).populate('product');
    }
    async update(id, updateCartDto) {
        const updatedCart = await this.cartModel.findByIdAndUpdate(id, updateCartDto, { new: true });
        console.log(updatedCart, "updatedCartupdatedCart");
        if (!updatedCart) {
            throw new Error("Product not found");
        }
        return updatedCart.save();
    }
    async remove(id) {
        return await this.cartModel.findByIdAndDelete(id).exec();
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map