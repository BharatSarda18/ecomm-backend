import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders } from './schema/order.schema';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class OrderService {

  constructor(@InjectModel(Orders.name) private orderModel: Model<Orders>, private readonly productService: ProductsService, private readonly userService: UsersService) { }

  async create(createOrderDto: CreateOrderDto, userid: string) {
    const order = await new this.orderModel({...createOrderDto,user:userid});
    console.log("userid")
    for (let item of order.items) {
     // console.log(item, "itemitem");
      await this.productService.updateStock(item.product, item.quantity);

      const doc = await order.save();

      const user = await this.userService.findById(userid);


      // Send email to user
      // await sendMail({
      //   to: user.email,
      //   html: invoiceTemplate(order), // Assuming you have invoiceTemplate function
      //   subject: 'Order Received',
      // });

    }

    return order;

  }

  async findAll(_sort: string, _order: string, _page: number, _limit: number) {
    let query = this.orderModel.find({ deleted: { $ne: true } });
    let totalOrdersQuery = this.orderModel.find({ deleted: { $ne: true } });


    // if (_sort && _order) {
    //   query = query.sort({ [_sort]: _order });
    // }
    if (_sort && _order) {
      // query = query.sort({ [_sort]: _order });
      // const sortCriteria = { [_sort]: _order === 'asc' ? 1 : -1 };
      query = query.sort({ [_sort]: _order === 'asc' ? 1 : -1 });
    }

    //   const totalDocs = await totalOrdersQuery.count().exec();
    // console.log({ totalDocs });
    const totalOrders = await this.orderModel.countDocuments(query);
    if (_page && _limit) {
      const pageSize = _limit;
      const page = _page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);

      //return this.orderModel.find({user:id});
    }
    const orders = await query.exec();
    return { orders, totalOrders };
  }
  findOwn() {
    return '';
  }

  fetchOrdersByUserId(id: string) {
    return this.orderModel.find({ user: id });
  }
  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true })
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
