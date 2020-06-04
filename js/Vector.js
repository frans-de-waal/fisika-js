/**
 * An n-dimensional vector.
 * 
 * An 2 or more dimensional vector with various operations.
 * 
 * @class Vector
 */
class Vector {
  elements = [];

  /**
   * Create a new Vector object.
   * 
   * Create and initialise a new Vector by defining it's elements.
   * 
   * @constructor
   * 
   * @param {...number} elements The elements of the Vector.
   */
  constructor(...elements) {
    this.elements = elements;
  }

  /**
   * Calculate the determinant for two Vectors.
   *
   * @static
   * 
   * @param {Vector} a The first Vector.
   * @param {Vector} b The second Vector.
   * 
   * @returns {number} The determinant of the two vectors.
   */
  static determinant(a, b) {
    return a.x * b.y - a.y * b.x;
  }

  /**
   * Add a Vector to this Vector.
   *
   * @param {Vector} vector The Vector to add to this Vector.
   *
   * @returns {Vector} The resulting Vector after adding a Vector to this Vector.
   */
  add(vector) {
    return new Vector(...this.elements.map((element, index) => element + vector.elements[index]));
  }

  /**
   * Subtract a Vector from this Vector.
   *
   * @param {Vector} vector The Vector to subtract from this Vector.
   *
   * @returns {Vector} The resulting Vector after subracting a Vector from this Vector.
   */
  subtract(vector) {
    return new Vector(...this.elements.map((element, index) => element - vector.elements[index]));
  }

  /**
   * Multiply this Vector's size by a scalar value.
   *
   * @param {number} scalar The scalar value.
   *
   * @returns {Vector} This Vector multiplied by a scalar value.
   */
  multiply(scalar) {
    return new Vector(...this.elements.map(element => element * scalar));
  }

  /**
   * Calculate the dot product of this Vector and another Vector.
   *
   * @param {Vector} vector The other Vector.
   *
   * @returns {number} The dot product of this Vector and another Vector.
   */
  dot(vector) {
    return this.elements.reduce((carry, element, index) => carry + element * vector.elements[index], 0);
  }

  /**
   * Calculate the cross product of this Vector and another Vector.
   *
   * @param {Vector} vector The other Vector.
   *
   * @returns {Vector} The cross product of this Vector and another Vector.
   */
  cross(vector) {
    const a = this.elements;
    const b = vector.elements;
    return new Vector(
      Vector.determinant([a[1], a[2]], [b[1], b[2]]),
      -Vector.determinant([a[0], a[2]], [b[0], b[2]]),
      Vector.determinant([a[0], a[1]], [b[0], b[1]])
    );
  }

  /**
   * Get the string representation of this Vector.
   *
   * @returns {string} The string representation of this Vector.
   */
  toString() {
    return 'Vector: [' + this.elements.toString() + ']';
  }

  /**
   * Get the size of this Vector.
   *
   * @returns {number} The size of this Vector.
   */
  get size() {
    return Math.sqrt(this.elements.reduce((total, element) => total + element ** 2, 0));
  }

  /**
   * Get the X value of this Vector.
   * 
   * @returns {number} The X value of this Vector.
   */
  get x() {
    return this.elements[0];
  }

  /**
   * Get the Y value of this Vector.
   * 
   * @returns {number} The Y value of this Vector.
   */
  get y() {
    return this.elements[1];
  }

  /**
   * Get the Z value of this Vector.
   * 
   * @returns {number} The Z value of this Vector.
   */
  get z() {
    return this.elements[2];
  }

  /**
   * Get the normal Vector of this Vector.
   * 
   * @returns {Vector} The normal Vector of this Vector.
   */
  get normal() {
    if (this.size === 0 || this.size === 1) {
      return this;
    }
    return this.multiply(1 / this.size);
  }

  /**
   * Rise this Vector's size to the power.
   * 
   * @param {number} power The power to rise this Vector's size.
   * 
   * @returns {Vector} This Vector with its size risen to the power.
   */
  power(power) {
    return this.normal.multiply(this.size ** power);
  }
}

class Position extends Vector {
  /**
   * Get the string representation of this Position Vector.
   *
   * @returns {string} The string representation of this Position Vector.
   */
  toString() {
    return 'Position [' + this.elements.toString() + ']';
  }

  /**
   * Add a Position to this Position.
   *
   * @param {Position} position The Position to add to this Position.
   *
   * @returns {Position} The resulting Position after adding a Position to this Position.
   */
  add(position) {
    return new Position(...super.add(position).elements);
  }

  /**
   * Subtract a Position from this Position.
   *
   * @param {Position} position The Position to subtract from this Position.
   *
   * @returns {Position} The resulting Position after subracting a Position from this Position.
   */
  subtract(position) {
    return new Position(...super.subtract(position).elements);
  }

  /**
   * Multiply this Position's size by a scalar value.
   *
   * @param {number} scalar The scalar value.
   *
   * @returns {Position} This Position multiplied by a scalar value.
   */
  multiply(scalar) {
    return new Position(...super.multiply(scalar).elements);
  }
};

class Velocity extends Vector {
  /**
   * Get the string representation of this Velocity Vector.
   *
   * @returns {string} The string representation of this Velocity Vector.
   */
  toString() {
    return 'Velocity [' + this.elements.toString() + ']';
  }

  /**
   * Add a Velocity to this Velocity.
   *
   * @param {Velocity} velocity The Velocity to add to this Velocity.
   *
   * @returns {Velocity} The resulting Velocity after adding a Velocity to this Velocity.
   */
  add(velocity) {
    return new Velocity(...super.add(velocity).elements);
  }

  /**
   * Subtract a Velocity from this Velocity.
   *
   * @param {Velocity} velocity The Velocity to subtract from this Velocity.
   *
   * @returns {Velocity} The resulting Velocity after subracting a Velocity from this Velocity.
   */
  subtract(velocity) {
    return new Velocity(...super.subtract(velocity).elements);
  }

  /**
   * Multiply this Velocity's size by a scalar value.
   *
   * @param {number} scalar The scalar value.
   *
   * @returns {Velocity} This Velocity multiplied by a scalar value.
   */
  multiply(scalar) {
    return new Velocity(...super.multiply(scalar).elements);
  }
};

class Acceleration extends Vector {
  /**
   * Get the string representation of this Acceleration Vector.
   *
   * @returns {string} The string representation of this Acceleration Vector.
   */
  toString() {
    return 'Acceleration [' + this.elements.toString() + ']';
  }

  /**
   * Add a Acceleration to this Acceleration.
   *
   * @param {Acceleration} acceleration The Acceleration to add to this Acceleration.
   *
   * @returns {Acceleration} The resulting Acceleration after adding a Acceleration to this Acceleration.
   */
  add(acceleration) {
    return new Acceleration(...super.add(acceleration).elements);
  }

  /**
   * Subtract a Acceleration from this Acceleration.
   *
   * @param {Acceleration} acceleration The Acceleration to subtract from this Acceleration.
   *
   * @returns {Acceleration} The resulting Acceleration after subracting a Acceleration from this Acceleration.
   */
  subtract(acceleration) {
    return new Acceleration(...super.subtract(acceleration).elements);
  }

  /**
   * Multiply this Acceleration's size by a scalar value.
   *
   * @param {number} scalar The scalar value.
   *
   * @returns {Acceleration} This Acceleration multiplied by a scalar value.
   */
  multiply(scalar) {
    return new Acceleration(...super.multiply(scalar).elements);
  }
};

class Force extends Vector {
  /**
   * Get the string representation of this Force Vector.
   *
   * @returns {string} The string representation of this Force Vector.
   */
  toString = () => 'Force [' + this.elements.toString() + ']';

  /**
   * Add a Force to this Force.
   *
   * @param {Force} force The Force to add to this Force.
   *
   * @returns {Force} The resulting Force after adding a Force to this Force.
   */
  add(force) {
    return new Force(...super.add(force).elements);
  }

  /**
   * Subtract a Force from this Force.
   *
   * @param {Force} force The Force to subtract from this Force.
   *
   * @returns {Force} The resulting Force after subracting a Force from this Force.
   */
  subtract(force) {
    return new Force(...super.subtract(force).elements);
  }

  /**
   * Multiply this Force's size by a scalar value.
   *
   * @param {number} scalar The scalar value.
   *
   * @returns {Force} This Force multiplied by a scalar value.
   */
  multiply(scalar) {
    return new Force(...super.multiply(scalar).elements);
  }
};