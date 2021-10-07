import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'src/auth/models/user.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';

@Injectable()
export class FeedService {
    constructor(
        @InjectRepository(FeedPostEntity)
        private readonly feedPostRepository : Repository<FeedPostEntity>
    ){}

    findAllPosts():Observable<FeedPost[]>{
        return from(this.feedPostRepository.find());
    }

    findPostById(postId:string):Observable<FeedPost>{
        return from(this.feedPostRepository.findOne(postId))
    }

    createPost(user:User, feedPost: FeedPost): Observable<FeedPost>{
        feedPost.author = user;
        return from(this.feedPostRepository.save(feedPost));
    }

    updatePost(id:string, feedPost: FeedPost): Observable<UpdateResult>{
        return from(this.feedPostRepository.update(id, feedPost));
    }

    deletePost(id:string): Observable<DeleteResult>{
        return from(this.feedPostRepository.delete(id))
    }
}
