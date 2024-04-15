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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("./schema/product.schema");
const mongoose_2 = require("mongoose");
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    create(createProductDto) {
        const product = new this.productModel(createProductDto);
        product.discountPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
        return product.save();
    }
    findAll() {
        const query = this.productModel.find().exec();
        return query;
    }
    async findAllWithPagination(_page, _limit, _sort, _order, category, brand) {
        let condition = {};
        let query = this.productModel.find(condition);
        let totalProductsQuery = this.productModel.find(condition);
        if (category) {
            query = query.find({ category: { $in: category.split(',') } });
            totalProductsQuery = totalProductsQuery.find({
                category: { $in: category.split(',') },
            });
        }
        if (brand) {
            query = query.find({ brand: { $in: brand.split(',') } });
            totalProductsQuery = totalProductsQuery.find({ brand: { $in: brand.split(',') } });
        }
        if (_sort && _order) {
            query = query.sort({ [_sort]: _order === 'asc' ? 1 : -1 });
        }
        const totalCount = await this.productModel.countDocuments(query);
        if (_page && _limit) {
            const pageSize = _limit;
            const page = _page;
            query = query.skip(pageSize * (page - 1)).limit(pageSize);
        }
        const result = await query.exec();
        return { totalCount, result };
    }
    async findOne(id) {
        try {
            const product = await this.productModel.findById(id).exec();
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        }
        catch (error) {
            throw new Error(`Failed to find product with ID ${id}: ${error.message}`);
        }
    }
    async update(id, updateProductDto) {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
        if (!updatedProduct) {
            throw new Error("Product not found");
        }
        updatedProduct.discountPrice = Math.round(updatedProduct.price * (1 - updatedProduct.discountPercentage / 100));
        return updatedProduct.save();
    }
    async updateStock(id, productquantity) {
        console.log(id, productquantity, "updateproduct");
        let product = await this.productModel.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        product.$inc('stock', -1 * productquantity);
        await product.save();
    }
    async remove(id) {
        return await this.productModel.findByIdAndDelete(id).exec();
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map