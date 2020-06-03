function run() {
  const scene = new Scene('canvas');
  scene.delta = 0.02;
  scene.scale = 50;
  const redBall = new Sphere(0.10, 'red');
  const greenBall = new Sphere(0.15, 'green');
  scene.entities = [
    new Particle(4, redBall, new Vector(scene.width / 3, greenBall.radius)),
    new Particle(14, greenBall, new Vector(scene.width / 3 * 2, greenBall.radius)),
  ];
  const gravity = new Vector(0, 9.81);
  const wind = new Vector(-10, 0);
  const density = 1.2;
  scene.progressEntity = (entity) => {
    // forces
    const drag = entity.drag(density);
    const totalForce = [wind, drag].reduce((total, f) => total.add(f), new Vector(0, 0));
    // acceleration
    const a = totalForce.multiply(1 / entity.mass).add(gravity);
    // change in velocity
    const dV = a.multiply(scene.delta);
    // new velocity
    entity.velocity = entity.velocity.add(dV);
    // change in position
    const dP = entity.velocity.multiply(scene.delta);
    // new position
    entity.position = entity.position.add(dP);
  }
  scene.start();
}