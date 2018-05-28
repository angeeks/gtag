import { Suite } from '@angeeks/testing';
import { AppComponent } from './app.component';

Suite.on<AppComponent>(AppComponent, (spec) => {
  spec.init();
  spec.expectCreated();
  spec.expectProperty('title', 'ngk');
});
