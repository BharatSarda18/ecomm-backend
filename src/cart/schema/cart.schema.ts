import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/schema/product.schema';
import { Users } from 'src/users/schema/users.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema({toJSON:{virtuals:true}})
export class Cart {
  @Prop({required:true})
  quantity: number;

  @Prop({required:true,type:mongoose.Schema.Types.ObjectId,ref:'Product'})
  product: Product;

  @Prop({required:true,type:mongoose.Schema.Types.ObjectId,ref:'Users'})
  user: Users;

  @Prop()
  size: mongoose.Schema.Types.Mixed;

  @Prop()
  color: mongoose.Schema.Types.Mixed;

}

const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.virtual('id').get(function (this: CartDocument) {
  return `${this._id}`;
});
export {CartSchema};