import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
export class Brand {
  @Prop({required:true,unique:true})
  label: string;

  @Prop({required:true,unique:true})
  value: string;

}

const BrandSchema = SchemaFactory.createForClass(Brand);

BrandSchema.virtual('id').get(function (this: BrandDocument) {
  return `${this._id}`;
});

export {BrandSchema};