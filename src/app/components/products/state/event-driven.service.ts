import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionEvent } from './state';

@Injectable({
  providedIn: 'root'
})
export class EventDrivenService {

  //Creer un subject
  sourceEventSubject: Subject<ActionEvent> = new Subject<ActionEvent>() ;

  // Creer un observable à partir de l'object subject
  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();

  constructor() { }

  //Permet de publier des evenements de type actionEvent
  publishEvent(event:ActionEvent){
    this.sourceEventSubject.next(event);
  }
}
