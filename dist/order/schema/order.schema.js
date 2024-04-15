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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersSchema = exports.Orders = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("../../users/schema/users.schema");
const paymentMethods = {
    values: ['card', 'cash'],
    message: 'enum validator failed for payment Methods'
};
let Orders = class Orders {
};
exports.Orders = Orders;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], Orders.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Orders.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Orders.prototype, "totalItems", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Users' }),
    __metadata("design:type", users_schema_1.Users)
], Orders.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: paymentMethods }),
    __metadata("design:type", String)
], Orders.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending' }),
    __metadata("design:type", String)
], Orders.prototype, "paymentStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'pending' }),
    __metadata("design:type", String)
], Orders.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", mongoose_2.default.Schema.Types.Mixed)
], Orders.prototype, "selectedAddress", void 0);
exports.Orders = Orders = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, toJSON: { virtuals: true } })
], Orders);
const OrdersSchema = mongoose_1.SchemaFactory.createForClass(Orders);
exports.OrdersSchema = OrdersSchema;
OrdersSchema.virtual('id').get(function () {
    return `${this._id}`;
});
//# sourceMappingURL=order.schema.js.map