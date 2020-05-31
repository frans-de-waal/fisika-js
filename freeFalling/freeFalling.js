function run() {
  const canvas = document.getElementById('canvas');
  const width = canvas.getAttribute('width');
  const height = canvas.getAttribute('height');
  const redBall = new Sphere(10, 'red');
  const greenBall = new Sphere(15, 'green');
  const entities = [
    new RigidBody(4, redBall, new Vector(width / 3, greenBall.radius)),
    new RigidBody(14, greenBall, new Vector(width / 3 * 2, greenBall.radius)),
  ];
  const context = canvas.getContext('2d');
  const gravity = new Vector(0, 9.81);
  const wind = new Vector(-10, 0);
  const density = 1.2;
  const delta = 0.02;

  function progressEntity(entity) {
    // forces
    const drag = entity.drag(density);
    const totalForce = [wind, drag].reduce((total, f) => total.add(f), new Vector(0, 0));
    // acceleration
    const a = totalForce.multiply(1 / entity.mass).add(gravity);
    // change in velocity
    const dV = a.multiply(delta);
    // new velocity
    entity.velocity = entity.velocity.add(dV);
    // change in position
    const dP = entity.velocity.multiply(delta);
    // new position
    entity.position = entity.position.add(dP);
  }

  function progress() {
    entities.forEach(entity => progressEntity(entity));
  }

  function drawGrid() {
    const size = 20;
    for (var x = size; x <= width; x += size) {
      context.moveTo(x, 0);
      context.lineTo(x, height);
    }
    for (var x = size; x <= height; x += size) {
      context.moveTo(0, x);
      context.lineTo(width, x);
    }
    context.strokeStyle = '#DDD';
    context.stroke();
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    drawGrid();
    entities.forEach(entity => entity.draw(context));
  }

  setInterval(() => {
    progress();
    draw();
  }, delta * 1000);
}