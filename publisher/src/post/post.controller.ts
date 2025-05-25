import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  async createPost(@Body() body: CreatePostDto) {
    const post = await this.postService.createPost(body);
    return post;
  }
}
