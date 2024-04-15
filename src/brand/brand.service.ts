import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from './schema/brand.schema';
import { Model } from 'mongoose';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>){}

  async create(createBrandDto: CreateBrandDto) {
    const brand=await new this.brandModel(createBrandDto);
    return await brand.save();
  }

  findAll() {
    return this.brandModel.find().exec();
  }
}
