import { IsEmail } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({timestamps:true ,toJSON:{virtuals:true}})
export class Users {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: 'user' })
    role: string;

    @Prop({default:[]})
    addresses: mongoose.Schema.Types.Mixed;

    @Prop()
    name: string;

    @Prop()
    salt: Buffer;

    @Prop({ default: '' })
    resetPasswordToken: string;

}

const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.virtual('id').get(function (this: UsersDocument) {
    return `${this._id}`;
});

export {UsersSchema};