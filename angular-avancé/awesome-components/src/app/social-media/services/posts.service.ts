import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Posts } from '../models/post.model';

@Injectable({providedIn: 'root'})
export class ServiceNameService {
    constructor(private httpClient: HttpClient) { }
    
}

@Injectable()

export class PostsService {

    constructor(private http: HttpClient){
    }

    getPosts(): Observable<Posts[]>{
        return this.http.get<Posts[]>(`${environment.apiUrl}/posts`)
    }

    addNewComment(postCommented: {comment:string, postId:number}) {
        console.log(postCommented);
    }
}