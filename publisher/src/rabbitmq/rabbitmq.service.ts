import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreatePostDto } from '../post/dto/create-post.dto';

@Injectable()
export class RabbitMQService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async sendMessage(msg: CreatePostDto) {
    await this.amqpConnection.publish('exchange1', 'post-route-key', msg);
  }
}
