import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, OrdersSchema } from './schema/order.schema';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports:[
    UsersModule,
    ProductsModule,
    PassportModule.register({defaultStrategy:"jwt"}),
    MongooseModule.forFeature([{name:Orders.name,schema:OrdersSchema}])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
