import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './models/message.model';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  create(createMessageDto: CreateMessageDto) {
    const createdCat = new this.messageModel(createMessageDto);
    return createdCat.save();
  }

  async findAll(query: FindAllDto) {
    const { author, startDate, endDate, limit = 100 } = query;

    const findValues = {
      ...(!!author && { author }),
      ...(!!(startDate && endDate) && {
        date: { $gte: startDate, $lt: endDate },
      }),
    };

    const messages = await this.messageModel.find(findValues).limit(limit);
    return messages;
  }

  async findByID(id: string) {
    const messages = await this.messageModel.findById(id);
    return messages;
  }
}
