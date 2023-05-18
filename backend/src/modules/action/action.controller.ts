import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionModel } from './action.model';

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}
  
  @Post()
  create(@Body() newData: ActionModel[], @Query('user_id') user_id: number) {
    return this.actionService.create(newData, user_id);
  }


  @Get()
  findAll(@Query('user_id') user_id: number) {
    return this.actionService.findAll(user_id);
  }


  @Post('filter')
  getByFilter(@Body() filterData: any, @Query('user_id') user_id: number) {
    return this.actionService.getByFilter(filterData, user_id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionService.remove(+id);
  }
}
