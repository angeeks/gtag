import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GtagModule, GtagID } from '@angeeks/gtag';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    GtagModule,
    BrowserModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: GtagID, useValue: 'UA-119875696-1' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
