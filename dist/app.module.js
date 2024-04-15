"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const brand_module_1 = require("./brand/brand.module");
const categories_module_1 = require("./categories/categories.module");
const order_module_1 = require("./order/order.module");
const products_module_1 = require("./products/products.module");
const users_module_1 = require("./users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const cart_module_1 = require("./cart/cart.module");
const core_1 = require("@nestjs/core");
const response_interceptor_1 = require("./interceptor/response/response.interceptor");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(`mongodb+srv://sardabharat71:S%40rda1809@ecommerce.7akgctz.mongodb.net/`),
            auth_module_1.AuthModule,
            brand_module_1.BrandModule,
            categories_module_1.CategoriesModule,
            order_module_1.OrderModule,
            products_module_1.ProductsModule,
            users_module_1.UsersModule,
            cart_module_1.CartModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_interceptor_1.ResponseInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map