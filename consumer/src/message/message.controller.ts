import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { FindAllDto } from './dto/find-all.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  findAll(@Query() query: FindAllDto) {
    return this.messageService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findByID(id);
  }
}
