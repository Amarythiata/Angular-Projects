import { PostsService } from './../services/posts.service';
import { Posts } from './../models/post.model';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()

export class PostsResolver implements Resolve<Posts[]> {
    constructor(private postsServices: PostsService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Posts[]> {
       return this.postsServices.getPosts();
        
    }
}