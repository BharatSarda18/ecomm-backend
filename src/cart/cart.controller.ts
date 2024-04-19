import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard, PassportModule } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto,@Req() req) {
    const id=req.user._id;
    return this.cartService.create(createCartDto,id);
  }

  @Get()
  findAll(@Req() req) {
    const id=req.user._id;
    console.log(id,"cartuserid");
    return this.cartService.findAll(id);
  }

  @Get(`/reset`)
  resetCart(@Req() req) {
    const id=req.user._id;
    return this.cartService.resetCartService(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
