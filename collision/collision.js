// Simulation

function physics() {
  const canvas = document.getElementById('canvas');
  const gravity = new Vector(0, 9.81);
  const wind = new Vector(-2, 0);
  const dragCoefficient = 0.47; // sphere
  const area = Math.PI * 10 * 10 / 100000;
  const greenBall = new RigidBody(0.1, area, dragCoefficient, new Vector(200, 10));
  const redBall = new RigidBody(1, area, dragCoefficient, new Vector(400, 10));
  const scene = new Scene(canvas, [gravity, wind], [greenBall, redBall]);
  const delta = 0.02;

  setInterval(() => {
    scene.progress(delta);
    scene.draw();
  }, delta * 1000);
}