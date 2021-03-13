import { GameServer } from '../server-domain/game-server'
import { ITakeUserInput } from "./i-take-user-input";

export class PlayerMover implements ITakeUserInput {

  server: GameServer;
  playerName: string;

  keys = {a: 65, w: 87, d: 68, s: 83, r: 82, space: 32, escape: 27, v: 86};

  _pressed = {};
  left = this.keys.a;
  up = this.keys.w;
  right = this.keys.d;
  down = this.keys.s;

  constructor(server: GameServer, name: string) {
    this.server = server;
    this.playerName = name;
  }

  click(evt: MouseEvent): void {
    console.log(`Click: ${JSON.stringify(evt)}`);
  }

  keyUp(evt: KeyboardEvent): void {
    console.log(`Keyup: ${JSON.stringify(evt)}`);
    // switch (evt.keyCode) {
    //   case this.keys.a: this.player.vel.x = this.isDown(this.right) ? this.player.speed : 0; break;
    //   case this.keys.d: this.player.vel.x = this.isDown(this.left) ? -this.player.speed : 0; break;
    //   case this.keys.s: this.player.vel.y = this.isDown(this.up) ? -this.player.speed : 0; break;
    //   case this.keys.w: this.player.vel.y = this.isDown(this.down) ? this.player.speed : 0; break;
    // }
    // delete this._pressed[event.keyCode];
  }

  keyDown(evt: KeyboardEvent): void {
    console.log(`Keydown: ${JSON.stringify(evt)}`);
    //console.log(event.keyCode);
    // switch (evt.keyCode) {
    //   case this.keys.a: this.player.vel.x = -this.player.speed; break;
    //   case this.keys.w: this.player.vel.y = -this.player.speed; break;
    //   case this.keys.d: this.player.vel.x = this.player.speed; break;
    //   case this.keys.s: this.player.vel.y = this.player.speed; break;
    // }
    // this._pressed[event.keyCode] = true;
  }

  // Keyboard control
  isDown(keyCode) {
    return this._pressed[keyCode];
  }

}