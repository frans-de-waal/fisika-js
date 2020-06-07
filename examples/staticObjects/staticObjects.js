import {
  Acceleration,
  Box,
  Force,
  Particle,
  Position,
  Scene,
  Sphere,
  Velocity,
  Vector,
  randomColor,
  oneDimensionalCollision,
} from '../../js/index.js';

export default function run() {
  const bounciness = 0.95;
  const scene = new Scene('canvas');
  scene.delta = 0.01;
  scene.entities = [
    // the environment
    new Particle(1, new Box(14, 2, '#704c28AA'), new Position(7, 9), new Velocity(0, 0), true),
    // the actors
    // new Particle(1, new Sphere(0.3, randomColor('AA')), new Position(1, 1), new Velocity(5, 0)),
    new Particle(1, new Box(1, 1, randomColor('AA')), new Position(5, 1), new Velocity(0, 0)),
  ];
  scene.progressEntity = (entity, index) => {
    // forces
    const totalForce = new Force(0, 0);
    // acceleration
    const a = totalForce.multiply(1 / entity.mass)
      // assume gravity
      .add(new Acceleration(0, 9.81));
    // change in velocity
    const dV = a.multiply(scene.delta);
    // new velocity
    entity.velocity = entity.velocity.add(dV);
    // change in position
    const dP = entity.velocity.multiply(scene.delta);
    // new position
    entity.position = entity.position.add(dP);

    // collisions
    scene.entities.forEach(collisionEntity => {
      if (entity.id === collisionEntity.id) {
        return;
      }
      if (
        entity.left <= collisionEntity.right &&
        entity.right >= collisionEntity.left &&
        entity.top <= collisionEntity.bottom &&
        entity.bottom >= collisionEntity.top
      ) {
        // collision detected!
        scene.stop();
        console.log('boom');

        // find the collision surface normal and tangent unit vectors
        const closestCorners1 = entity.corners.sort((c1, c2) => c1.subtract(collisionEntity.position).size - c2.subtract(collisionEntity.position).size).splice(0, 2);
        const closestCorners2 = collisionEntity.corners.sort((c1, c2) => c1.subtract(entity.position).size - c2.subtract(entity.position).size).splice(0, 2);
        const t1 = closestCorners1[0].subtract(closestCorners1[1]);
        const t2 = closestCorners2[0].subtract(closestCorners2[1]);
        scene.drawVector(t1, closestCorners1[1], 'red');
        scene.drawVector(t2, closestCorners2[1], 'blue');
        // return;

        const t = t1;
        const n = new Vector(-t.y, t.x);

        // move to initial touch positions
        // const overlap = closestCorners1[1].subtract(closestCorners2[1]).dot(n);
        // collisionEntity.position = collisionEntity.position.add(n.multiply(overlap / 2));
        // entity.position = entity.position.subtract(n.multiply(overlap / 2));

        /**
         * Resolve the collisions
         * @see https://imada.sdu.dk/~rolf/Edu/DM815/E10/2dcollisions.pdf
         */


        // find the normal and tangent components of the two entity velocities before collision
        const vi1 = entity.velocity;
        const vi2 = collisionEntity.velocity;
        const vi1n = vi1.dot(n);
        const vi1t = vi1.dot(t);
        const vi2n = vi2.dot(n);
        const vi2t = vi2.dot(t);

        // find the new tengential velocities after collision
        const vp1t = vi1t;
        const vp2t = vi2t;

        // find the new normal velocities after collision
        const vp1n = oneDimensionalCollision(vi1n, vi2n, entity.mass, collisionEntity.mass) * bounciness;
        const vp2n = oneDimensionalCollision(vi2n, vi1n, collisionEntity.mass, entity.mass) * bounciness;

        // convert the scalar normal and tangent (post collision) velocities to vectors
        const vp1nVector = n.multiply(vp1n);
        const vp1tVector = t.multiply(vp1t);
        const vp2nVector = n.multiply(vp2n);
        const vp2tVector = t.multiply(vp2t);

        // final velocities for each entity
        entity.velocity = vp1nVector.add(vp1tVector);
        collisionEntity.velocity = vp2nVector.add(vp2tVector);
      }
    });
  };
  scene.start();
}