import { Controller, Get, Post, Body,Query, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto,@Req() req ) {
    console.log('createuserdto');
    const user=req?.user?._id;
   
    return this.orderService.create(createOrderDto,user);
  }

  @Get()
  findAll(@Req() req,@Query() query) {
    const id=req?.user?.id;
    const { _page,_limit , _sort, _order } = query;
    // console.log(query,"user===>");
   // if (_page && _limit) {
      // Calculate skip value based on page and limit
      const skip = (_page - 1) * _limit;

      // Fetch products with pagination and sorting if provided
      return this.orderService.findAll( _page,_limit , _sort, _order);
   // }
    //return this.orderService.findAll(id);
  }


  @Get(`/own/`)
  fetchOrdersByUser(@Req() req){
    const id=req?.user?._id;
    // console.log("orderid",req);
    return this.orderService.fetchOrdersByUserId(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
