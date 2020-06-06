function run() {
  const scene = new Scene('canvas');
  scene.entities = [
    // the environment
    new Particle(1, new Box(14, 2, '#704c28'), new Position(7, 9), new Velocity(0, 0), true),
    // the actor
    new Particle(1, new Sphere(0.3, 'blue'), new Position(1, 1), new Velocity(1, 0)),
  ];
  scene.start();
}