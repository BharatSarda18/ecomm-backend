import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model, SortOrder } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }
  create(createProductDto: CreateProductDto) {
    const product = new this.productModel(createProductDto);
    product.discountPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
    return product.save();
  }

  findAll() {
    const query = this.productModel.find().exec();
    return query;
  }

  async findAllWithPagination(_page: number, _limit: number, _sort: string, _order: string, category: string, brand: string) {


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
      // query = query.sort({ [_sort]: _order });
      // const sortCriteria = { [_sort]: _order === 'asc' ? 1 : -1 };
      query = query.sort({ [_sort]: _order === 'asc' ? 1 : -1 });
    }
    const totalCount = await this.productModel.countDocuments(query);

    // const totalDocs = await totalProductsQuery.count().exec();
    //console.log({ totalDocs });

    if (_page && _limit) {
      const pageSize = _limit;
      const page = _page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
    

    const result = await query.exec();

    return { totalCount, result };

  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error(`Failed to find product with ID ${id}: ${error.message}`);
    }
  }


  async update(id: number, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    updatedProduct.discountPrice = Math.round(updatedProduct.price * (1 - updatedProduct.discountPercentage / 100));
    return updatedProduct.save();

  }

  async updateStock(id: string, productquantity: any) {
    //let stockObj={stock:stock-productquantity};
    console.log(id,productquantity,"updateproduct");

    let product =  await this.productModel.findById(id);
     if (!product) {
      throw new Error("Product not found");
     }
    product.$inc('stock',-1*productquantity);
    // for optimum performance we should make inventory outside of product.
    await product.save()
    
   // const updatedProduct = await this.productModel.findByIdAndUpdate(id, stockObj, { new: true });

    // if (!updatedProduct) {
    //   throw new Error("Product not found");
    // }
   // updatedProduct.discountPrice = Math.round(updatedProduct.price * (1 - updatedProduct.discountPercentage / 100));
  //  return updatedProduct.save();

  }

  async remove(id: number) {
    return await this.productModel.findByIdAndDelete(id).exec();
  }
}
