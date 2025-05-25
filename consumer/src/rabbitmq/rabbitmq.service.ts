import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class RabbitMQService {
  private readonly logger = new Logger(RabbitMQService.name);

  constructor() {}

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'post-route-key',
    queue: 'post-queue',
  })
  receiveMessage(msg: CreatePostDto) {
    this.logger.log(
      `Received ${msg.authorId} post: ${msg.content || 'No message'}`,
    );
  }
}
