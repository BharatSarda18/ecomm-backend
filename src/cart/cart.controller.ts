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
    console.log("iduser====>");
    const id=req.user.id;
    
    return this.cartService.create(createCartDto,id);
  }

  @Get()
  findAll(@Req() req) {
    const id=req.user.id;
    return this.cartService.findAll(id);
  }

  @Get(`/reset`)
  resetCart(@Req() req) {
    const id=req.user.id;
    console.log(req,"request")
    return this.cartService.resetCartService(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    console.log(id,"idforupdate")
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
