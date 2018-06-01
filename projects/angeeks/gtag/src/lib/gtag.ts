import { Injectable } from '@angular/core';
import { GtagConfig } from './gtag.config';
import { Globals } from '@angeeks/globals';

export interface Params {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class Gtag {
  constructor(private cfg: GtagConfig, private g: Globals) {
    this.init();
  }

  event(name, params?: Params) {
    this.cmd('event', name, params);
  }

  set(params: Params) {
    this.cmd('set', params);
  }

  config(params: Params) {
    this.cmd('config', this.cfg.trackId, params);
  }

  private cmd(...data) {
    this.dataLayer.push(arguments);
  }

  private get dataLayer() {
    return this.g.window['dataLayer'];
  }

  private init() {
    this.injectScriptTag();
    const { dataLayer = [] } = <any>this.g.window;
    this.g.window['dataLayer'] = dataLayer;
    this.cmd('js', new this.g.Date());
    this.cmd('config', this.cfg.trackId);
  }

  private injectScriptTag() {
    const { document: doc } = this.g;
    const url = this.cfg.scriptUrl;
    return new Promise((resolve, reject) => {
      const head = doc.head || doc.getElementsByTagName('head')[0];
      const script = doc.createElement('script');
      script.async = true;
      script.src = url;
      script.charset = 'utf8';
      head.appendChild(script);
      script.onload = resolve;
      script.onerror = reject;
    });
  }
}
