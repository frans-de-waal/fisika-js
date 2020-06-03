function run() {
  const scene = new Scene('canvas');
  scene.delta = 0.02;
  scene.scale = 100;
  scene.entities = [
    new Particle(1, new Sphere(0.10, 'green'), new Vector(scene.width / 2, 10), new Vector(50, 10)),
  ];
  scene.progressEntity = (entity) => {
    // forces
    const totalForce = new Vector(0, 0);
    // acceleration
    const a = totalForce.multiply(1 / entity.mass).add(new Vector(0, 9.81));
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