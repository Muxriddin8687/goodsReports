import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductGroupService } from './product-group.service';
import { ProductGroupModel } from './product-group.model';

@Controller('group')
export class ProductGroupController {
  constructor(private readonly productGroupService: ProductGroupService) {}

  @Post()
  create(@Body() newData: ProductGroupModel, @Query('user_id') user_id: number) {
    return this.productGroupService.create(newData, user_id);
  }


  @Get()
  findAll(@Query('user_id') user_id: number) {
    return this.productGroupService.findAll(user_id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productGroupService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() newData: ProductGroupModel) {
    return this.productGroupService.update(+id, newData);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productGroupService.remove(+id);
  }
}

