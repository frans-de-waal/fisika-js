import {
  Acceleration,
  Particle,
  Position,
  Force,
  Scene,
  Sphere,
  Vector,
  Velocity,
  randomColor,
} from '/js/index.js';

function oneDimensionalCollision(v1, v2, m1, m2) {
  return (v1 * (m1 - m2) + 2 * m2 * v2) / (m1 + m2);
}

export default function run() {
  const bounciness = 1;
  const density = 1.2;
  let mouse = new Position(0, 0);
  let mouseStart = new Position(0, 0);
  let dragging = false;
  const gravity = new Acceleration(0, 9.81);
  const scene = new Scene('canvas');
  scene.delta = 0.02; // seconds per tick
  scene.scale = 100; // pixels per meter
  scene.entities = [
    new Particle(
      1,
      new Sphere(0.25, randomColor()),
      new Position(1, 1),
      new Velocity(2, 1)
    ),
    new Particle(
      1,
      new Sphere(0.25, randomColor()),
      new Position(6, 1),
      new Velocity(-2, 0),
    ),
  ];
  scene.progressEntity = (entity, index) => {
    // forces
    const totalForce = new Force(0, 0);
    // const totalForce = entity.drag(density);
    // acceleration
    const a = totalForce.multiply(1 / entity.mass)
      .add(gravity);
    // change in velocity
    const dV = a.multiply(scene.delta);
    // new velocity
    entity.velocity = entity.velocity.add(dV);
    // change in position
    const dP = entity.velocity.multiply(scene.delta);
    // new position
    entity.position = entity.position.add(dP);

    // detect collision with the sides of the box
    if (entity.position.y - entity.shape.radius <= 0 || entity.position.y + entity.shape.radius >= scene.height / scene.scale) {
      entity.velocity = new Velocity(entity.velocity.x, entity.velocity.y * -1 * bounciness);
      if (entity.position.y + entity.shape.radius >= scene.height / scene.scale) {
        entity.position = new Position(entity.position.x, scene.height / scene.scale - entity.shape.radius);
      } else {
        entity.position = new Position(entity.position.x, 0 + entity.shape.radius);
      }
    }
    if (entity.position.x - entity.shape.radius <= 0 || entity.position.x + entity.shape.radius >= scene.width / scene.scale) {
      entity.velocity = new Velocity(entity.velocity.x * -1 * bounciness, entity.velocity.y);
      if (entity.position.x + entity.shape.radius >= scene.width / scene.scale) {
        entity.position = new Position(scene.width / scene.scale - entity.shape.radius, entity.position.y);
      } else {
        entity.position = new Position(0 + entity.shape.radius, entity.position.y);
      }
    }

    // detect collisions with other balls
    const otherEntities = [...scene.entities];
    otherEntities.splice(index, 1);
    otherEntities.forEach(collisionEntity => {
      const relation = collisionEntity.position.subtract(entity.position);
      const distance = relation.size;
      if (distance < entity.shape.radius + collisionEntity.shape.radius) {
        /**
         * resolve the collisions
         * @see https://imada.sdu.dk/~rolf/Edu/DM815/E10/2dcollisions.pdf
         */

        // scene.stop();

        // find the collision surface normal and tangent unit vectors
        const n = relation.normal;
        const t = new Vector(-n.y, n.x);

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
        const vp1n = oneDimensionalCollision(vi1n, vi2n, entity.mass, collisionEntity.mass);
        const vp2n = oneDimensionalCollision(vi2n, vi1n, collisionEntity.mass, entity.mass);

        // convert the scalar normal and tangent (post collision) velocities to vectors
        const vp1nVector = n.multiply(vp1n);
        const vp1tVector = t.multiply(vp1t);
        const vp2nVector = n.multiply(vp2n);
        const vp2tVector = t.multiply(vp2t);

        // final velocities for each entity
        entity.velocity = vp1nVector.add(vp1tVector);
        collisionEntity.velocity = vp2nVector.add(vp2tVector);

        scene.drawVector(entity.velocity, entity.position, 'blue');
        scene.drawVector(collisionEntity.velocity, collisionEntity.position, 'blue');
      }
    });
  }
  scene.draw = () => {
    scene.context.clearRect(0, 0, scene.width, scene.height);
    scene.drawGrid();
    scene.drawScale();
    scene.entities.forEach(entity => entity.draw(scene));
    if (dragging) {
      scene.drawVector(mouse.subtract(mouseStart), mouseStart);
    }
  }
  scene.start();

  scene.canvas.addEventListener('mousemove', event => {
    const canvasRect = scene.canvas.getBoundingClientRect();
    mouse = new Position(event.clientX - canvasRect.left, event.clientY - canvasRect.top);
  });
  scene.canvas.addEventListener('mousedown', event => {
    const canvasRect = scene.canvas.getBoundingClientRect();
    mouseStart = new Position(event.clientX - canvasRect.left, event.clientY - canvasRect.top);
    dragging = true;
  });
  scene.canvas.addEventListener('mouseup', event => {
    if (dragging) {
      dragging = false;
      scene.entities.push(new Particle(
        1,
        new Sphere(0.25, randomColor()),
        mouseStart.multiply(1 / scene.scale),
        mouse.subtract(mouseStart).multiply(10 / scene.scale)
      ));
    }
  });

  // setTimeout(scene.stop, 5000);
}