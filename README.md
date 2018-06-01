# Gtag

[![Build Status](https://travis-ci.org/angeeks/gtag.svg?branch=master)](https://travis-ci.org/angeeks/gtag)
[![npm version](https://badge.fury.io/js/%40angeeks%2Fgtag.svg)](https://www.npmjs.com/package/@angeeks/gtag)

Yet another gtag util with angular.

# This got simpler install process

```
  npm i -P @angeeks/gtag
```

```
# in module
import { GtagModule } from '@angeeks/gtag';

@NgModule({
  imports: [
    GtagModule
  ],
  providers: [
    { provide: GtagID, useValue: 'UA-XXXXX-X' }
  ]
})

# injection
import { Gtag } from '@angeeks/gtag';

class SomeComponent {
  constructor(private gtag: Gtag) {
    gtag.event('some-component.triggered');
  }
}

```

# More about gtag

[Gtag](https://developers.google.com/gtagjs/reference/event)
