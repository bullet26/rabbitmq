import { Module } from '@nestjs/common';
import { RabbitMQModule as RabbitMQ } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [
    RabbitMQ.forRoot({
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      uri: process.env.RABBITMQ_URI || 'amqp://guest:guest@rmq:5672',
      connectionInitOptions: { wait: false }, // not wait for a connection
    }),
  ],
  controllers: [],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
