import { ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ } from "@angular/core";
import { Entity, Location } from "./entity";
import { ObjectMesh } from "./object-mesh";
import { Player } from "./player";
import { Rock } from "./rock";
import { Ship } from "./ship";

export class Server {

  width = 1000;
  height = 1000;
  meshGridSize = 50;
  mesh: ObjectMesh;
  collisionDistance = 30;

  private entities: Entity[] = [
    new Rock(new Location(50, 50)),
    new Rock(new Location(50, 200))
  ];

  private playerNames: Set<string>;
  private shipMapping = {};

  constructor() {
    this.playerNames = new Set<string>();
  }

  addEntity(entity: Entity) {
    this.entities.push(entity)
  }

  updateEntities() {
    this.mesh = new ObjectMesh(this.width, this.height, this.meshGridSize, this.entities);

    for (let i = 0; i < this.entities.length; i++) {
      let entity = this.entities[i];
      let nearbyObjects = this.mesh.checkCollisions(entity, this.collisionDistance);

      for (let j = 0; j < nearbyObjects.length; j++) {
        let nearbyObject = nearbyObjects[j];
        if(this.areColliding(entity, nearbyObject)) {
          entity.collideWith(nearbyObject);
        }

        if (!entity.isAlive) {
          if (entity instanceof Ship)
            this.notifyOwner(entity);
        }
      }

    }
  }

  notifyOwner(ship: Ship) {
    // inform owner of this ship that they have been destroyed. Their game is over or they must respawn.
  }

  areColliding(entity: Entity, nearbyObject: Entity): boolean {
    return false;
  }

  getEntity(username: string) {
    
  }

  /**
   * Register the requesting user in the system
   * @param username The name of the user to register in the system
   */
  addMe(username: string) {
    if (!this.playerNames.has(username)) {
      this.playerNames.add(username);
    }
  }

  /**
   * Add the requesting user to a game. Create a ship for them.
   * @param username The name of the user to add to a game
   */
  joinGame(username: string) {
    if (!this.playerNames.has(username)) {
      return false;
    }
    let ship = new Ship(new Location(100, 100), username);
    this.shipMapping[username] = ship;

    for (let username in this.shipMapping) {
      console.log(`${username} -> ${JSON.stringify(this.shipMapping[username])}`);
    }
  }

  getMyShipAndSurroundingObjects(username: string): {ship: Ship, objects: Entity[]} {
    let ship: Ship = this.shipMapping[username]; // TODO: Check for existence of username...
    let objects = this.mesh.checkCollisions(ship, ship.visibility);
    return {ship: ship, objects: objects};
  }

  turnLeft(username: string) {
    let ship: Ship = this.shipMapping[username]; // TODO: Check for existence of username...
    ship.velocity.h -= 10; // degrees.
    if (ship.velocity.h < 0) {
      ship.velocity.h += 360;
    }

    console.log(`Ship velocity: ${JSON.stringify(ship.velocity)}`)
  }

  turnRight(username: string) {
    let ship: Ship = this.shipMapping[username]; // TODO: Check for existence of username...
    ship.velocity.h += 10; // degrees.
    ship.velocity.h %= 360;

    console.log(`Ship velocity: ${JSON.stringify(ship.velocity)}`)
  }

  forward(username: string) {
    let ship: Ship = this.shipMapping[username]; // TODO: Check for existence of username...
    let radianHeading = ship.velocity.h * Math.PI / 180;

    // TODO: Have actual velocity of the ship...
    let newX = ship.location.x + 5 * Math.sin(radianHeading);
    let newY = ship.location.y - 5 * Math.cos(radianHeading);

    ship.location = new Location(newX, newY);
    console.log(`Ship location: ${JSON.stringify(ship.location)}`);
  }

  backward(username: string) {
    let ship: Ship = this.shipMapping[username]; // TODO: Check for existence of username...
    let radianHeading = ship.velocity.h * Math.PI / 180;

    // TODO: Have actual velocity of the ship...
    let newX = ship.location.x - 5 * Math.sin(radianHeading);
    let newY = ship.location.y + 5 * Math.cos(radianHeading);

    ship.location = new Location(newX, newY);
    console.log(`Ship location: ${JSON.stringify(ship.location)}`);
  }

}