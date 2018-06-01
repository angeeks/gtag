import { Component } from '@angular/core';
import { Gtag } from '@angeeks/gtag';

@Component({
  selector: 'ngk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngk';
  constructor(gtag: Gtag) {
    gtag.event('page_view', { loaded: true, project: '@angeeks/gtag' });
  }
}
