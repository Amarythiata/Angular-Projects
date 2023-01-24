import { Posts } from './../../models/post.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() post!: Posts;
  @Output() postCommented = new EventEmitter<{comment:string, postId:number}>()

  constructor() { }

  ngOnInit(): void {
  }

  onNewComment(comment: string) {
    this.postCommented.emit({comment, postId: this.post.id});
  }

}
