import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular'
import { EntityDrawer } from 'src/domain/app-domain/entity-drawer';
import { PlayerMover } from 'src/domain/app-domain/player-mover';
import { Entity, Location } from 'src/domain/server-domain/entity';
import { Ship } from 'src/domain/server-domain/ship';
import { GameServer } from '../../domain/server-domain/game-server';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements AfterViewInit {
  @ViewChild('imageCanvas', { static: false }) canvas: any;

  @HostListener('document:keyup', ['$event'])
  handleKeyUpEvent(event: KeyboardEvent) { 
    this.playerMover.keyUp(event);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDownEvent(event: KeyboardEvent) {
    this.playerMover.keyDown(event);
  }

  @HostListener('document:click', ['$event'])
  handleClickEvent(event: MouseEvent) {
    this.playerMover.click(event);
  }

  canvasElement: any;
  saveX: number;
  saveY: number;
  scale: number = 0.5;
  username: string = 'Ryan';

  server: GameServer;
  playerMover: PlayerMover;
  entityDrawer: EntityDrawer;

  constructor(private plt: Platform) {

    this.server = new GameServer();
    this.server.addMe(this.username);
    this.server.joinGame(this.username);

    this.playerMover = new PlayerMover(this.server, this.username);

    this.entityDrawer = new EntityDrawer();
  }

  ngAfterViewInit() {

    // TODO: Register window event listeners

    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width();
    this.canvasElement.height = this.plt.height();

    this.run();
  }

  canvasClicked(ev) {
    console.log('Start drawing');
    let canvasPosition = this.canvasElement.getBoundingClientRect();

    console.log(`ev: (${ev.pageX}, ${ev.pageY})`);
    console.log(canvasPosition);

    let clickX = ev.pageX * 2 - canvasPosition.x * 2;
    let clickY = ev.pageY * 2 - canvasPosition.y;

    let ctx = this.canvasElement.getContext('2d');

    ctx.beginPath();
    ctx.arc(clickX, clickY, 10, 0, 2 * Math.PI);
    ctx.stroke();

  }

  /**
   * Game loop for the client.
   */
  run() {
    this.server.updateEntities();
    let data = this.server.getMyShipAndSurroundingObjects(this.username);
    this.draw(data);
  }

  turnLeft() {
    console.log('app.turnLeft()');
    this.server.turnLeft(this.username);
    let data = this.server.getMyShipAndSurroundingObjects(this.username);
    this.draw(data);
  }

  turnRight() {
    console.log('app.turnRight()');
    this.server.turnRight(this.username);
    let data = this.server.getMyShipAndSurroundingObjects(this.username);
    this.draw(data);
  }

  forward() {
    console.log('app.forward()');
    this.server.forward(this.username);
    let data = this.server.getMyShipAndSurroundingObjects(this.username);
    this.draw(data);
  }

  backward() {
    console.log('app.backward()');
    this.server.backward(this.username);
    let data = this.server.getMyShipAndSurroundingObjects(this.username);
    this.draw(data);
  }

  draw(data: { ship: Ship, objects: Entity[] }) {

    let ctx: CanvasRenderingContext2D = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let xMiddle = ctx.canvas.width / 2;
    let yMiddle = ctx.canvas.height / 2;

    this.entityDrawer.drawPlayerShip(ctx, data.ship, xMiddle, yMiddle);

    data.objects.forEach(entity => {
      let renderLocation = new Location(entity.location.x - data.ship.location.x, entity.location.y -
        data.ship.location.y);
      this.entityDrawer.drawEntity(ctx, entity, renderLocation);
    })

    ctx.translate(-xMiddle, -yMiddle);

  }

}

