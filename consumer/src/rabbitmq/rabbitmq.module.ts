import { Module } from '@nestjs/common';
import { RabbitMQModule as RabbitMQ } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQService } from './rabbitmq.service';
import { MessageModule } from 'src/message/message.module';

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
      channels: {
        'channel-main': {
          prefetchCount: 10, //  By setting prefetchCount for a particular channel you can manage message speeds of your various handlers on the same connection.
          default: true,
        },
      },
    }),
    MessageModule,
  ],
  controllers: [],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
