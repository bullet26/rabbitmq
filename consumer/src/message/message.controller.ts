import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { FindAllDto } from './dto/find-all.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { MessageDTO } from './dto/message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new message',
  })
  @ApiResponse({
    status: 201,
    type: MessageDTO,
  })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all messages',
    description: 'Retrieve all messages with optional filtering and limit.',

    parameters: [
      {
        name: 'author',
        example: 'John Doe',
        in: 'query',
        description: 'The author of the posts to filter by',
        schema: { type: 'string' },
      },
      {
        name: 'startDate',
        in: 'query',
        example: '2023-01-01T00:00:00Z',
        description: 'The start date to filter posts from',
        schema: { type: 'string', format: 'date-time' },
      },
      {
        name: 'endDate',
        in: 'query',
        example: '2023-12-31T23:59:59Z',
        description: 'The end date to filter posts until',
        schema: { type: 'string', format: 'date-time' },
      },
      {
        name: 'limit',
        in: 'query',
        example: 10,
        description: 'Limit the number of messages returned',
        schema: { type: 'integer', minimum: 1, maximum: 100 },
      },
    ],
  })
  @ApiResponse({
    status: 200,
    type: [MessageDTO],
  })
  findAll(@Query() query: FindAllDto) {
    return this.messageService.findAll(query);
  }

  @ApiOperation({
    summary: 'Find a message by ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    example: '6838229a4a84eaed07d523a6',
    description:
      'The unique identifier of the message to retrieve, for example: 6838229a4a84eaed07d523a6. Use a valid MongoDB ObjectId format.',
    schema: { type: 'string', format: 'objectId' },
  })
  @ApiResponse({
    status: 200,
    type: MessageDTO,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findByID(id);
  }
}
