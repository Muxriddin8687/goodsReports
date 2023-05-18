import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductModel } from './product.model';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() newData: ProductModel, @Query('user_id') user_id: number) {
    return this.productService.create(newData, user_id);
  }


  @Get()
  findAll(@Query('user_id') user_id: number) {
    return this.productService.findAll(user_id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() newData: ProductModel) {
    return this.productService.update(+id, newData);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
