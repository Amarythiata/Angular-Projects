import { slideAndFadeAnimation } from './../../animation/slide-and-fade.animation';
import { flashAnimation } from './../../animation/flash.animation';
import { animate, animateChild, group, query, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from 'src/app/core/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('', [
      transition(':enter', [
          query('@listItem', [
              stagger(5000, [
                  animateChild()
              ])
          ])
      ])
  ]),
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
      transition(':enter', [
        query('.comment-text, .comment-date', [
          style({opacity: 0
            }),
           ]),
           useAnimation(slideAndFadeAnimation, {
             params: {
              time: '5004ms',
              startColor: 'rgb(201, 157, 242)'      
             }
           })
           ,
        group([
          useAnimation(flashAnimation, {
            params: {
              time: '250ms',
              flashColor: 'rgb(249,179,111)'
            }
          }),
          query('.comment-text', [
              animate('250ms', style({
                  opacity: 1
              }))
          ]),
          query('.comment-date', [
              animate('500ms', style({
                  opacity: 1
              }))
          ]),
        ])
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit {

  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  animationStates:{ [key: number]: 'default' | 'active' } = {};
  commentCtrl!: FormControl;

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)])
    for (let index in this.comments) {
      this.animationStates[index] = 'default';
  }
  }

  onLeaveComment(){
    if(this.commentCtrl.invalid){
      return;
    }
    const maxId = Math.max(...this.comments.map(comment => comment.id));
    this.comments.unshift({
        id: maxId + 1,
        comment: this.commentCtrl.value,
        createdDate: new Date().toISOString(),
        userId: 1
    });
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();

  }
  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
}

  onListItemMouseLeave(index: number) {
      this.animationStates[index] = 'default';
  }

}
