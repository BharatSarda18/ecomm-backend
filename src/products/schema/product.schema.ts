import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  toJSON:{
    virtuals:true
  }
})
export class Product {
  @Prop({required:true,unique:true})
  title: string;

  @Prop({required:true,trim:true})
  description: string;

  @Prop({min:1,max:10000000})
  price: number;

  @Prop({min:1,max:99})
  discountPercentage: number;

  @Prop({default:0,min:0,max:5})
  rating: number;

  @Prop({default:0,min:0})
  stock: number;

  @Prop({required:true})
  brand: string;

  @Prop({required:true})
  category: string;

  @Prop({required:true})
  thumbnail: string;

  @Prop({required:true})
  images: string[];

  @Prop()
  colors:  mongoose.Schema.Types.Mixed;

  @Prop()
  sizes: mongoose.Schema.Types.Mixed;

  @Prop([String])
  highlights: string[];

  @Prop()
  discountPrice: number;

  @Prop({default:false})
  deleted: boolean;

  @Prop({type:mongoose.Schema.Types.ObjectId ,ref:'User'})
  user: User;

}

const ProductSchema = SchemaFactory.createForClass(Product);


 
ProductSchema.virtual('id').get(function (this: ProductDocument) {
  return `${this._id}`;
});
 
export { ProductSchema };