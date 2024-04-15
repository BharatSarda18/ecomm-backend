import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Users } from 'src/users/schema/users.schema';

export type OrderDocument = HydratedDocument<Orders>;

const paymentMethods={
    values:['card', 'cash'],
    message: 'enum validator failed for payment Methods'

}

@Schema({timestamps:true,toJSON:{virtuals:true}})
export class Orders {
    @Prop({ required: true })
    items: Record<string, any>[];
    
  //  mongoose.Schema.Types.Mixed[];

    @Prop()
    totalAmount: number;

    @Prop()
    totalItems: number;

    @Prop({required:true,type:mongoose.Schema.Types.ObjectId,ref:'Users'})
    user: Users;

    @Prop({required:true,enum:paymentMethods})
    paymentMethod: string;

    @Prop({default:'pending'})
    paymentStatus: string;

    @Prop({ default: 'pending' })
    status: string;

    @Prop({ required:true })
    selectedAddress:  mongoose.Schema.Types.Mixed;

}

const OrdersSchema = SchemaFactory.createForClass(Orders);

OrdersSchema.virtual('id').get(function (this: OrderDocument) {
    return `${this._id}`;
  });

export {OrdersSchema};