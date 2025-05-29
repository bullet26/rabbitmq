import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostDTO } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Create a new post',
  })
  @ApiResponse({
    status: 201,
    type: PostDTO,
  })
  async createPost(@Body() body: CreatePostDto) {
    const post = await this.postService.createPost(body);
    return post;
  }
}
