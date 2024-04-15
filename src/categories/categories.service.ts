import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private catogeryModel: Model<Category>) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const catogery = await new this.catogeryModel(createCategoryDto);
    return await catogery.save();
  }

  findAll() {
    return this.catogeryModel.find().exec();
  }

  async remove(id: number) {
    return await this.catogeryModel.findByIdAndDelete(id).exec();
  }

}
