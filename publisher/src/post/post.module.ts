import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [RabbitMQModule],
})
export class PostModule {}
