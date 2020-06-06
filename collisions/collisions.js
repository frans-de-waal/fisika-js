function run() {
  const bounciness = 0.9;
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
      new Sphere(0.25, 'green'),
      new Position(1, 1),
      new Velocity(2, 1)
    ),
  ];
  scene.progressEntity = (entity) => {
    // forces
    const totalForce = entity.drag(density);
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
  }
  scene.draw = () => {
    scene.context.clearRect(0, 0, scene.width, scene.height);
    scene.drawGrid();
    scene.drawScale();
    scene.entities.forEach(entity => entity.draw(scene));
    // console.log(`mouse: ${mouse}`);
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
      const canvasRect = scene.canvas.getBoundingClientRect();
      const mouseEnd = new Position(event.clientX - canvasRect.left, event.clientY - canvasRect.top);
      dragging = false;
      scene.entities.push(new Particle(
        1,
        new Sphere(0.25, `#${Math.floor(Math.random() * 16777215).toString(16)}`),
        mouseStart.multiply(1 / scene.scale),
        mouse.subtract(mouseStart).multiply(10 / scene.scale)
      ));
    }
  });
}