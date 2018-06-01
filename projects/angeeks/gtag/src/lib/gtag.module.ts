import { NgModule } from '@angular/core';
import { GlobalsModule } from '@angeeks/globals';
import { Gtag } from './gtag';

@NgModule({
  imports: [
    GlobalsModule
  ],
  providers: [Gtag],
  exports: []
})
export class GtagModule { }
