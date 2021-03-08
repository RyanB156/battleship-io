import { BulletType, Projectile } from './projectile';

export class Weapon {
  barrelLocation: Location;
  weaponLocationOffset: Location; // Distance from the weapon to the center of the ship
  heading: number;
  reloadSpeed: number;
  roundCount: number;
  bulletBehavior: BulletType;

  protected constructor(barrelLocation: Location, offsetLocation: Location, reloadSpeed: number, bulletBehavior: BulletType) {
    this.barrelLocation = barrelLocation;
    this.weaponLocationOffset = offsetLocation;
    this.heading = 0;
    this.reloadSpeed = reloadSpeed;
    this.bulletBehavior = bulletBehavior;
  }

  /**
   * Fire in the direction the weapon is facing
   * @returns Projectile list - The projectiles fired
   */
  protected fire?(): Projectile[] {
    throw new Error('Base Weapon cannot fire');
  }

}

export class Cannon extends Weapon {
  
}

export class MissleLauncher extends Weapon {
  
}

export class TorpedoTube extends Weapon {
  
}

export class MineLayer extends Weapon {

}