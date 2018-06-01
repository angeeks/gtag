import { Inject, Injectable, InjectionToken } from '@angular/core';

export function defaultTrackID() {
  return '__gtag.id__';
}

export const GtagID = new InjectionToken<string>('gtag.id', {
  providedIn: 'root',
  factory: defaultTrackID
});

@Injectable({
  providedIn: 'root'
})
export class GtagConfig {
  gtagUrl = 'https://www.googletagmanager.com/gtag/js?id=';
  constructor(@Inject(GtagID) private id: string) {}

  get trackId() {
    return this.id;
  }
  get scriptUrl() {
    return `${this.gtagUrl}${this.id}`;
  }
}
