/**
 * Calculate the determinant for two Vectors.
 *
 * @param {Vector} a
 * @param {Vector} b
 * 
 * @returns {number}
 */
function determinant(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}

class Vector {
  constructor(...elements) {
    this.elements = elements;
  }

  elements = [];

  /**
   * Add a Vector to this Vector.
   *
   * @param {Vector} vector
   *
   * @returns {Vector}
   */
  add = vector => new Vector(...this.elements.map((element, index) => element + vector.elements[index]));

  /**
   * Subtract a Vector from this Vector.
   *
   * @param {Vector} vector
   *
   * @returns {Vector}
   */
  subtract = vector => new Vector(...this.elements.map((element, index) => element - vector.elements[index]));

  /**
   * Multiply this Vector by a scalar value.
   *
   * @param {number} scalar
   *
   * @returns {Vector}
   */
  multiply = scalar => new Vector(...this.elements.map(element => element * scalar));

  /**
   * Calculate the dot product.
   *
   * @param {Vector} vector
   *
   * @returns {number}
   */
  dot = vector => this.elements.reduce((carry, element, index) => carry + element * vector.elements[index], 0);

  /**
   * Calculate the cross product.
   *
   * @param {Vector} vector
   *
   * @returns {Vector}
   */
  cross(vector) {
    const a = this.elements;
    const b = vector.elements;
    return new Vector(
      determinant([a[1], a[2]], [b[1], b[2]]),
      -determinant([a[0], a[2]], [b[0], b[2]]),
      determinant([a[0], a[1]], [b[0], b[1]])
    );
  }

  /**
   * String representation of a Vector.
   *
   * @returns {string}
   */
  toString = () => '[' + this.elements.toString() + ']';

  /**
   * The size of the Vector
   *
   * @returns {number}
   */
  size = () => Math.sqrt(this.elements.reduce((total, element) => total + element ** 2, 0));

  /**
   * The X value of the Vector
   * 
   * @returns {number}
   */
  x = () => this.elements[0];

  /**
   * The Y value of the Vector
   * 
   * @returns {number}
   */
  y = () => this.elements[1];

  /**
   * The Z value of the Vector
   * 
   * @returns {number}
   */
  z = () => this.elements[2];

  /**
   * Normal of this Vector
   * 
   * @returns {Vector}
   */
  normal = () => this.multiply(1 / this.size());

  /**
   * Scalar power of this Vector
   * 
   * @param {number} power
   * 
   * @returns {Vector}
   */
  power = power => this.normal().multiply(this.size() ** power);
}

