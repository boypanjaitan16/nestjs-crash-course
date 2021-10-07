import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';

@Controller('/feed')
export class FeedController {

    constructor(private feedService : FeedService){

    }

    @UseGuards(JwtGuard)
    @Get()
    index():Observable<FeedPost[]>{
        return this.feedService.findAllPosts();
    }

    @Get(':id')
    show(@Param() id:string):Observable<FeedPost>{
        return this.feedService.findPostById(id);
    }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() post: FeedPost, @Request() req):Observable<FeedPost>{
        return this.feedService.createPost(req.user, post);
    }

    @Post(':id')
    update(@Param() id:string, @Body() post: FeedPost):Observable<UpdateResult>{
        return this.feedService.updatePost(id, post);
    }

    @Delete(':id')
    delete(@Param() id:string):Observable<DeleteResult>{
        return this.feedService.deletePost(id);
    }
}
