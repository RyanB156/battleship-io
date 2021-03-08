import { Entity, Velocity, Location } from "./entity";


export class Rock extends Entity {
  constructor(location: Location) {
    super(location, new Velocity());
    this.canMove = false;
  }
}