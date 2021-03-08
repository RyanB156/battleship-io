import { Entity, Location } from "../server-domain/entity";
import { Rock } from "../server-domain/rock";
import { Ship } from "../server-domain/ship";

export class EntityDrawer {

  
  drawShip(ctx: CanvasRenderingContext2D, ship: Ship, renderLocation: Location): void {
    // translate
    // rotate
    // draw
    // unrotate
    // untranslate
  }

  drawRock(ctx: CanvasRenderingContext2D, rock: Rock, renderLocation: Location): void {
    ctx.beginPath();
      ctx.arc(renderLocation.x, renderLocation.y, 
              10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
  }

  /**
   * Determine the type of the entity and draw it. Called after translating ctx for drawing the player's ship.
   * @param ctx 
   * @param entity 
   */
  drawEntity(ctx: CanvasRenderingContext2D, entity: Entity, renderLocation: Location): void {
    if (entity instanceof Ship) {
      this.drawShip(ctx, entity, renderLocation);
    } else if (entity instanceof Rock) {
      this.drawRock(ctx, entity, renderLocation);
    }
  }

  /**
   * Draw the player's ship in the center of the screen.
   * @param ctx The canvas context to draw to
   * @param ship The player's ship to draw
   */
  drawPlayerShip(ctx: CanvasRenderingContext2D, ship: Ship): void {
    ctx.fillRect(-ship.width / 2, -ship.height / 2, ship.width, ship.height);
    ctx.stroke();
  }

}