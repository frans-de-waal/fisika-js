// Canvas
let WIDTH = 0;
let HEIGHT = 0;
let CTX = null;
// Simulation
const DELTA_TIME = 0.02; // simulation time step (s)
// The ball
const P_BALL = new Vector(400, 100); // initial position of the ball (pixels)
const V_BALL = new Vector(400, -200); // initial velocity of the ball (pixels/s)
let pBall = P_BALL;
let vBall = V_BALL;
const M_BALL = 0.1 // mass of the ball (kg)
const RADIUS = 10; // radius of the ball (pixels)
const C_D = 0.47; // Coeffecient of drag for a sphere. See https://en.wikipedia.org/wiki/Drag_coefficient for other shapes.
const A = Math.PI * RADIUS * RADIUS / 100000; // Frontal area of the ball; divided by 10000 to compensate for the 1px = 1cm relation
// The environment
const RHO = 1.2;  // Density of air. See https://en.wikipedia.org/wiki/Density for other materials.
const F_GRAVITY = new Vector(0, 9.81); // force of gravity (N)
const F_WIND = new Vector(-5, -2) // force of wind blowing (N)
const FORCES = [
  F_GRAVITY,
  F_WIND,
];

// ** TODO: add a force eminating from the mouse pointer

// Legend
const P_LEGEND = new Vector(700, 100);
const LEGEND_SIZE = 10;

function drawVector(vector, position, color = 'blue') {
  const headlen = vector.size() * 0.25;
  const end = position.add(vector);
  const fromx = position.x();
  const fromy = position.y();
  const tox = end.x();
  const toy = end.y();
  const dx = tox - fromx;
  const dy = toy - fromy;
  const angle = Math.atan2(dy, dx);
  CTX.strokeStyle = color;
  CTX.beginPath();
  CTX.moveTo(fromx, fromy);
  CTX.lineTo(tox, toy);
  CTX.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  CTX.moveTo(tox, toy);
  CTX.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  CTX.stroke();
}

function drawBall(x, y) {
  CTX.fillStyle = 'red';
  CTX.beginPath();
  CTX.arc(x, y, RADIUS, 0, Math.PI * 2, true);
  CTX.fill();
  CTX.closePath();
}

function loop() {
  // calculate attributes of the ball after one time step
  // force
  const F_DRAG = vBall.power(2).multiply(-0.5 * RHO * C_D * A); // https://en.wikipedia.org/wiki/Drag_equation
  const F_BALL = FORCES.concat(F_DRAG).reduce((total, f) => total.add(f), new Vector(0, 0));
  // acceleration
  const A_BALL = F_BALL.multiply(1 / M_BALL);
  // change in velocity
  const dV = A_BALL.multiply(DELTA_TIME);
  // new velocity
  vBall = vBall.add(dV);
  // change in position
  const dP = vBall.multiply(DELTA_TIME);
  // new position
  pBall = pBall.add(dP);

  // draw after one time step
  CTX.clearRect(0, 0, WIDTH, HEIGHT);
  // draw the ball
  drawBall(pBall.x(), pBall.y());
  drawVector(vBall, pBall, 'red');
  // draw the forces
  drawVector(F_DRAG, pBall, 'black');
  drawVector(F_WIND.multiply(LEGEND_SIZE), P_LEGEND, 'blue');
  drawVector(F_GRAVITY.multiply(LEGEND_SIZE), P_LEGEND, 'green');
}

function physics() {
  CTX = document.getElementById('canvas').getContext('2d');
  WIDTH = document.getElementById('canvas').getAttribute('width');
  HEIGHT = document.getElementById('canvas').getAttribute('height');

  setInterval(loop, DELTA_TIME * 1000);
  // reset
  setInterval(() => {
    pBall = P_BALL;
    vBall = V_BALL;
  }, 10 * 1000);
}