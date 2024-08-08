
// explicit math functions

const  pi = Math.PI, radian = pi / 180, e = Math.E;

const   abs = (...x) => x.flat().map(Math.abs);
const  ceil = (...x) => x.flat().map(Math.ceil);
const clamp = (x, a, b) => x < a ? a : x > b ? b : x;
const   exp = (...x) => x.flat().map(Math.exp);
const floor = (...x) => x.flat().map(Math.floor);
const fract = (...x) => x.flat().map(x => x - Math.floor(x));
const isinf = x => !isFinite(x);
const isnan = x => isNaN(x);
const   log = (...x) => x.flat().map(Math.log);
const  log2 = (...x) => x.flat().map(Math.log2);
const log10 = (...x) => x.flat().map(Math.log10);
const   max = (...x) => Math.max(...x.flat());
const   min = (...x) => Math.min(...x.flat());
const   mix = (a, b, t) => a * (1 - t) + b * t;
const  lerp = mix;
const noise = Math.random;
const random = noise;
const  rand = noise;
const   pow = Math.pow;
const round = (...x) => x.flat().map(Math.round);
const  sign = (...x) => x.flat().map(Math.sign);
const smoothstep = (a, b, t) => mix(a, b, t * t * (3 - 2 * t));
const  sqrt = (...x) => x.flat().map(Math.sqrt);
const  step = (a, x) => x < a ? 0 : 1;
const trunc = (...x) => x.flat().map(Math.trunc);

const  acos = (...x) => x.flat().map(Math.acos);
const acosh = (...x) => x.flat().map(Math.acosh);
const  asin = (...x) => x.flat().map(Math.asin);
const asinh = (...x) => x.flat().map(Math.asinh);
const  atan = (...x) => x.flat().map(Math.atan);
const atanh = (...x) => x.flat().map(Math.atanh);
const   cos = (...x) => x.flat().map(Math.cos);
const  cosh = (...x) => x.flat().map(Math.cosh);
const degrees = x => x * 180 / pi;
const   deg = degrees;
const radians = x => x * pi / 180;
const   rad = radians;
const   sin = (...x) => x.flat().map(Math.sin);
const  sinh = (...x) => x.flat().map(Math.sinh);
const   tan = (...x) => x.flat().map(Math.tan);
const  tanh = (...x) => x.flat().map(Math.tanh);
const cotan = (...x) => x.flat().map(x => 1 / Math.tan(x));
const   sec = (...x) => x.flat().map(x => 1 / Math.cos(x));
const cosec = (...x) => x.flat().map(x => 1 / Math.sin(x));
const atan2 = Math.atan2;
const hypot = (...x) => Math.hypot(...x.flat());

const norm = (...x) => x.flat().map(x => sin(x) * 0.5 + 0.5);
