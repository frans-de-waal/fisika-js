import Position from './Position.js';

export default class Shape {
  dragCoefficient;
  color;
  image;

  /**
   * Create a new Shape object.
   * 
   * @constructor
   * 
   * @param {number} dragCoefficient The drag coefficient of the Shape.
   * @param {string} color The color of the Shape.
   */
  constructor(dragCoefficient, color, image = null) {
    this.dragCoefficient = dragCoefficient;
    this.color = color;
    this.image = image;
  }

  /**
   * Get the frontal area for this Shape.
   * 
   * @returns {number} The frontal area of this Shape.
   */
  get area() {
    return 0;
  }

  /**
   * Draw this Shape on the context at the given position.
   * 
   * @param {Scene} scene A Scene to draw this shape on.
   * @param {Position} position A position Vector.
   */
  draw(scene, position) {
    console.log('nothing to draw');
  }
}

export class Sphere extends Shape {
  radius;

  /**
   * Create a new Sphere object.
   * 
   * @constructor
   * 
   * @param {number} radius The radius of the Sphere (m).
   * @param {string} color The color of the Sphere.
   */
  constructor(radius, color, image = null) {
    super(0.47, color, image);
    this.radius = radius;
  }

  /**
   * Get the frontal area for this Sphere.
   * 
   * @returns {number} The frontal area of this Sphere.
   */
  get area() {
    return Math.PI * this.radius ** 2;
  }

  /**
   * Draw this Sphere on the context at the given position.
   * 
   * @param {Scene} scene A Scene to draw this shape on.
   * @param {Position} position A position Vector.
   */
  draw(scene, position) {
    const { context, scale } = scene;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(position.x * scale, position.y * scale, this.radius * scale, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }

  get width() {
    return this.radius * 2;
  }

  get height() {
    return this.radius * 2;
  }
}

export class Box extends Shape {
  width;
  height;
  /**
   * Create a new Box object.
   * 
   * @constructor
   * 
   * @param {string} color The color of the Box.
   */
  constructor(width, height, color, image = null) {
    super(0.6, color, image);
    this.width = width;
    this.height = height;
  }

  /**
   * Get the frontal area for this Box.
   * 
   * @returns {number} The frontal area of this Box.
   */
  get area() {
    return this.width * this.height;
  }

  /**
   * Draw this Sphere on the context at the given position.
   * 
   * @param {Scene} scene A Scene to draw this shape on.
   * @param {Position} position A position Vector.
   */
  draw(scene, position) {
    const { context, scale } = scene;
    const width = this.width * scale;
    const height = this.height * scale;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const x = position.x * scale;
    const y = position.y * scale;
    const corners = [
      new Position(x - halfWidth, y - halfHeight),
      new Position(x + halfWidth, y - halfHeight),
      new Position(x + halfWidth, y + halfHeight),
      new Position(x - halfWidth, y + halfHeight),
    ];
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(corners[3].x, corners[3].y);
    corners.forEach(position => context.lineTo(position.x, position.y));
    context.fill();
    context.closePath();
    if (this.image) {
      this.image.width = width;
      this.image.height = height;
      context.drawImage(this.image, 200, 45, 330, 480, corners[0].x, corners[0].y, width, height);
    }
  }
}