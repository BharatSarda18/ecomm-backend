import { Controller, Get, Post,Query, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto,) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Req() req,@Query() query) {
    console.log(query,"query");
    const { _page,_limit , _sort, _order ,category ,brand} = query;
    console.log(req.user,"user===>");
    if (_page && _limit) {
      // Calculate skip value based on page and limit
      const skip = (_page - 1) * _limit;

      // Fetch products with pagination and sorting if provided
      return this.productsService.findAllWithPagination( _page,_limit , _sort, _order ,category,brand);
    }
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
