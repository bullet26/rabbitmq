import { Module } from '@nestjs/common';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_URI || 'mongodb://mongodb:27017',
      {
        auth: {
          username: process.env.DB_ROOT_USER,
          password: process.env.DB_ROOT_PASS,
        },
      },
    ),
    RabbitMQModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
