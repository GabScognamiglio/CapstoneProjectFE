import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeySequenceService {
  private keySequence = '';
  private sequenceSubject = new Subject<void>();

  sequence$ = this.sequenceSubject.asObservable();

  checkSequence(key: string) {
    this.keySequence += key;
    if (this.keySequence.length > 6) {
      this.keySequence = this.keySequence.slice(-6);
    }

    if (this.keySequence === 'gsgsgs') {
      this.sequenceSubject.next();
      this.keySequence = '';
    }
  }
}
