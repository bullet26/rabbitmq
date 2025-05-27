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
      `${process.env.DATABASE_URI}:${process.env.DB_PORT}`,
      {
        dbName: process.env.DB_NAME,
        auth: {
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
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
