import { changeUsername, initAction } from './state/01-actions';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from './state/00-reducer';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'starter';

  public user : Observable<any> = {} as Observable<any>;

  constructor( private store: Store<State>){ }

  ngOnInit(){
    this.store.dispatch(initAction());
    this.user = this.store.pipe(select((state: State )=>state.root.user));
  
   }

  public changeUsername(): void {
    this.store.dispatch(changeUsername({username: `Coulisses ${Math.random()}`}));
  }
}
