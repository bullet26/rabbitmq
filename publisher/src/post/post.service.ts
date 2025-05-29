import { BadRequestException, Injectable } from '@nestjs/common';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private rabbitMQ: RabbitMQService) {}
  async createPost(postData: CreatePostDto) {
    const { content, author } = postData;

    if (!content || !author) {
      throw new BadRequestException('Content and authorId are required');
    }

    const post = {
      id: Date.now().toString(),
      content,
      author,
    };

    await this.rabbitMQ.sendMessage(postData);

    return post;
  }
}
