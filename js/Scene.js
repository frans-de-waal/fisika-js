class Scene {
  context;
  width = 0;
  height = 0;
  delta = 0;
  progressEntity = () => { };
  entities = [];
  interval;
  scale = 50; // pixels per meter
  gridSize = 1; // meters

  constructor(id, delta, progressEntity, entities, scale = 50, gridSize = 1) {
    const canvas = document.getElementById(id);
    this.context = canvas.getContext('2d');
    this.width = canvas.getAttribute('width');
    this.height = canvas.getAttribute('height');
    this.delta = delta;
    this.progressEntity = progressEntity;
    this.entities = entities;
    this.scale = scale;
    this.gridSize = gridSize;
  }

  drawGrid = () => {
    const { context, width, height, scale, gridSize } = this;
    const size = gridSize * scale; // pixels
    context.beginPath();
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

  drawScale = () => {
    const { context, width, height, scale, gridSize } = this;
    const size = gridSize * scale; // pixels
    const color = '#E0E';
    // line
    context.beginPath();
    context.moveTo(size, height - 30);
    context.lineTo(size, height - 20);
    context.lineTo(size * 2, height - 20);
    context.lineTo(size * 2, height - 30);
    context.strokeStyle = color;
    context.stroke();
    // text
    context.fillStyle = color;
    context.font = `18px 'Noto Sans', sans-serif`;
    context.fillText(`${gridSize} m`, size * 1.5, height - 30);
    context.textBaseline = 'middle';
    context.textAlign = "center";
  }

  draw = () => {
    const { context, width, height, drawGrid, drawScale, entities } = this;
    context.clearRect(0, 0, width, height);
    drawGrid();
    drawScale();
    entities.forEach(entity => entity.draw(this));
  }

  progress = () => {
    const { entities, progressEntity } = this;
    entities.forEach(entity => progressEntity(entity));
  }

  loop = () => {
    try {
      this.progress();
      this.draw();
    } catch (error) {
      clearInterval(this.interval);
      throw error;
    }
  }

  start = () => {
    this.interval = setInterval(this.loop, this.delta * 1000);
  }
}