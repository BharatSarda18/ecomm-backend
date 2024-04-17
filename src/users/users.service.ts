import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schema/users.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(Users.name) private userstModel: Model<Users>){}

  async findById(id:string) {
    const user=await this.userstModel.findById(id);
    if (!user) {
      throw new BadRequestException("User did not match");
    }
    const {resetPasswordToken,password,...userObject} = user.toObject();
    return userObject;
  }

  async findOne(email:string){ 
   return this.userstModel.findOne({email});
  }

  async findOneWithResetPassToken(email:string,token:string){ 
    return this.userstModel.findOne({ email: email, resetPasswordToken: token });
   }
   
  create(user:CreateUserDto){
    const newuser=new this.userstModel(user);
    return newuser.save();
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userstModel.findByIdAndUpdate(id,updateUserDto,{new:true});
  }

}
