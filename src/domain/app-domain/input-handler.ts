import { Observable, fromEvent } from 'rxjs';

export class InputHandler {

  keys = {a: 65, w: 87, d: 68, s: 83, r: 82, space: 32, escape: 27, v: 86};

  _pressed = {};
  left = this.keys.a;
  up = this.keys.w;
  right = this.keys.d;
  down = this.keys.s;

  click;

  constructor(window: Window) {
    this.click = fromEvent(window, 'mousedown').subscribe(res => console.log('input-handler' + res));
  }

}