import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class RabbitMQService {
  private readonly logger = new Logger(RabbitMQService.name);

  constructor(private messageService: MessageService) {}

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'post-route-key',
    queue: 'post-queue',
  })
  async receiveMessage(msg: CreateMessageDto) {
    const { author, content, date } = msg;
    this.logger.log(`Received ${author} post: ${content || 'No message'}`);

    if (author && content && date) {
      await this.messageService.create(msg);
    }
  }
}
