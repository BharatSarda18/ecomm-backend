import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { HydratedDocument } from 'mongoose';


export type CategoryDocument = HydratedDocument<Category>;

@Schema({toJSON:{virtuals:true}})
export class Category {
    @Prop({ required: true ,unique:true})
    label: string;

    @Prop({required:true,unique:true})
    value: string;


}

const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.virtual('id').get(function (this: CategoryDocument) {
    return `${this._id}`;
});

export {CategorySchema};