import { Component, HostListener } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { KeySequenceService } from './services/key-sequence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gs-budget-fe';
  showRocket = false;

  constructor(private authSrv: AuthService, private keySequenceService: KeySequenceService) {
    this.keySequenceService.sequence$.subscribe(() => {
      this.showRocket = true;
      setTimeout(() => this.showRocket = false, 3000); // Hide rocket after 3 seconds
    });
  }

  ngOnInit(): void {
    this.authSrv.restore();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keySequenceService.checkSequence(event.key);
  }
}
