
import { Entity, Velocity, Location } from './entity';

/* Type of ammo that can be used. 
  Bullet - collide with terrain and ships in the way
  Missle - detonate at target location
  Torpedo - collide with terrain, ships. not hurt by 
  Mine - stationary, explode on contact with ships
*/
export enum BulletType {Bullet, Missle, Torpedo, Mine}

// TODO: Missles should be a different type because they have a target and check distance to target as they move...

export class Projectile extends Entity {
  damage: number;
  behavior: BulletType;

  private constructor(location: Location, velocity: Velocity, damage: number, behavior: BulletType) {
    super(location, velocity);
    this.damage = damage;
    this.behavior = behavior;

    if (behavior == BulletType.Missle) {
      this.canCollide = false;
    }
  }
}