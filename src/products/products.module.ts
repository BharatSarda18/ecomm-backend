import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {ProductSchema,Product} from "./schema/product.schema";
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    AuthModule,
    PassportModule.register({defaultStrategy:"jwt"}),
    MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]
})
export class ProductsModule {}
