import { inject } from '@angular/core/testing';
import { ComponentSuite as Component } from '@angeeks/testing';
import { GtagModule, GtagID } from '@angeeks/gtag';
import { windowToken } from '@angeeks/globals';

import { AppComponent } from './app.component';

function mockWindow() {
  return {
    Date() {},
    document: {
      head: {
        appendChild() {}
      },
      createElement() { return {}; }
    }
  };
}

Component.suite<AppComponent>(AppComponent, (spec) => {
  spec.init({
    imports: [
      GtagModule
    ],
    providers: [
      { provide: windowToken, useFactory: mockWindow },
      { provide: GtagID, useValue: 'test' }
    ]
  });
  spec.expectCreated();
  spec.expectProperty('title', 'ngk');
  it('should call gtag.event', inject([windowToken], (wnd) => {
    const w = Array.from(wnd.dataLayer.pop());
    expect(w).toEqual(['event', 'page_view', { loaded: true, project: '@angeeks/gtag' }]);
  }));
});
