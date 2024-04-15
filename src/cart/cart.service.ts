import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schema/cart.schema';
import { Model } from 'mongoose';

@Injectable()
export class CartService {

  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) { }

  async create(createCartDto: CreateCartDto,id:any) {
    const cart = await new this.cartModel({...createCartDto,user:id});
    return cart.save();
  }

  // async resetCartService(id:string){
  //   const cart=await new this.cartModel({...{},user:id});
  //   return cart.save();
  // }

  async resetCartService(id: string) {
    console.log(id,'idfordelete');
    const cart=await this.cartModel.findOne({user:id});
    const deletedcart=await this.cartModel.findByIdAndDelete(cart._id);
    return cart;
}
  findAll(id:number) {
    return this.cartModel.find({user:id}).populate('product');
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const updatedCart = await this.cartModel.findByIdAndUpdate(id, updateCartDto, { new: true });
    console.log(updatedCart,"updatedCartupdatedCart")
    if (!updatedCart) {
      throw new Error("Product not found");
    }
    return updatedCart.save();
  }

  async remove(id: string) {
    return await this.cartModel.findByIdAndDelete(id).exec();
  }
}
