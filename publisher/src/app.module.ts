import { Module } from '@nestjs/common';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { RootModule } from './root/root.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    RabbitMQModule,
    PostModule,
    RootModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
