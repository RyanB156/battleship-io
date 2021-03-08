import { Entity, Location, Velocity } from "./entity";


export class Ship extends Entity {

  width: number = 25;
  height: number = 50;
  owner: string;
  visibility: number;

  public constructor(location: Location, owner: string) {
    super(location, new Velocity(0, 0));
    this.owner = owner;
    this.visibility = 200;
  }

}