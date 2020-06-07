import {
  Acceleration,
  Box,
  Force,
  Particle,
  Position,
  randomColor,
  Scene,
  Velocity,
} from '../../js/index.js';

export default function run() {
  const density = 1.2;
  let jump = false;
  let onFloor = false;
  let move = new Acceleration(0, 0);
  const scene = new Scene('canvas');
  const floor = new Particle(
    Number.MAX_SAFE_INTEGER,
    new Box(scene.width / scene.scale, 0.1, 'grey'),
    new Position(scene.width / scene.scale / 2, scene.height / scene.scale - 0.05),
    new Velocity(0, 0),
    true
  );
  const theGuy = new Particle(
    85,
    new Box(0.73, 1.86, randomColor()),
    new Position(2, 8.9),
    new Velocity(0, 0)
  );
  scene.entities = [
    floor,
    theGuy,
  ];
  scene.progressEntity = entity => {
    const diff = entity.bottom - floor.top;
    onFloor = diff >= 0;

    if (diff > 0) {
      entity.position = entity.position.add(new Position(0, -diff));
    }

    // forces
    let f = entity.drag(density);
    if (jump) {
      f = f.add(new Force(0, -20000));
      jump = false;
    }
    // acceleration
    let a = f.multiply(1 / entity.mass).add(move);
    if (!onFloor) {
      // gravity
      a = a.add(new Acceleration(0, 9.81));
    }
    // change in velocity
    const dV = a.multiply(scene.delta);
    // new velocity
    entity.velocity = entity.velocity.add(dV);
    if (onFloor) {
      entity.velocity = new Velocity(entity.velocity.x, Math.min(0, entity.velocity.y));
    }
    // change in position
    const dP = entity.velocity.multiply(scene.delta);
    // new position
    entity.position = entity.position.add(dP);
  };
  scene.start();

  window.addEventListener('keydown', event => {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }
    switch (event.code) {
      case 'Space':
        if (onFloor) {
          jump = true;
        }
        break;
      case 'ArrowLeft':
        move = new Force(-10, 0);
        break;
      case 'ArrowRight':
        move = new Force(10, 0);
        break;
      default:
        break;
    }
    event.preventDefault();
  });

  window.addEventListener('keyup', event => {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }
    switch (event.code) {
      case 'ArrowLeft':
        move = new Force(0, 0);
        break;
      case 'ArrowRight':
        move = new Force(0, 0);
        break;
      default:
        break;
    }
    event.preventDefault();
  });
}