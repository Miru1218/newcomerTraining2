import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = '(」・ω・)」うー！(／・ω・)／にゃー！';
  constructor(private router: Router) { }

  redirectToPerfume() {
    this.router.navigateByUrl('/perfume');
  }
}
