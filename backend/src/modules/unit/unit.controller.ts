import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitModel } from './unit.model';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  create(@Body() newData: UnitModel, @Query('user_id') user_id: number) {
    return this.unitService.create(newData, user_id);
  }


  @Get()
  findAll(@Query('user_id') user_id: number) {
    return this.unitService.findAll(user_id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() newData: UnitModel) {
    return this.unitService.update(+id, newData);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitService.remove(+id);
  }
}


