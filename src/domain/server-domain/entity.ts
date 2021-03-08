
export class Location {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Velocity {
  m: number;
  h: number;

  constructor(magnitude: number = 0, heading: number = 0) {
    this.m = magnitude;
    this.h = heading;
  }
}

export class Entity {
  location: Location;
  velocity: Velocity;
  canMove: boolean = true;
  canCollide: boolean = true;
  health: number = 100;

  constructor(location: Location, velocity: Velocity) {
    this.velocity = velocity;
    this.location = location;
  }

  /**
   * Determines whether this entity will collide with the specified entity
   * @param entity The other entity that this one is colliding with
   * @returns boolean - Whether or not this entity is colliding with the specified entity
   */
  protected willCollideWithThis?(entity: Entity): boolean;
  
  /**
   * Get the mesh used for collision detection
   * @returns Collision mesh - The mesh used to detect collisions
   * @todo Research how to implement this...
   */
  protected getBoundingBox?();

  /**
   * Determine whether the entity is alive or not
   * @returns boolean - whether the entities health is above 0
   */
  public isAlive(): boolean {
    return this.health > 0;
  }

  /**
   * Apply collision between this entity and the specified entity
   * @param entity The entity this entity is colliding with
   */
  public collideWith(entity: Entity): void {

  }
}