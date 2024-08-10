
// explicit math functions

const  pi = Math.PI, e = Math.E, ln10 = Math.LN10,
	ln2 = Math.LN2, log2e = Math.LOG2E, log10e = Math.LOG10E,
	sqrt2 = Math.SQRT2, sqrt1_2 = Math.SQRT1_2;

const   abs = (...x) => x.flat().map(Math.abs);
const  ceil = (...x) => x.flat().map(Math.ceil);
const clamp = (x, min, max) => x < min ? min : x > max ? max : x;
const   exp = (...x) => x.flat().map(Math.exp);
const floor = (...x) => x.flat().map(Math.floor);
const fract = (...x) => x.flat().map(x => x - Math.floor(x));
const hypot = (...x) => Math.hypot(...x.flat());
const hypothenuse = hypot;
const   log = (...x) => x.flat().map(Math.log);
const  log2 = (...x) => x.flat().map(Math.log2);
const log10 = (...x) => x.flat().map(Math.log10);
const   max = (...x) => Math.max(...x.flat());
const   min = (...x) => Math.min(...x.flat());
const   mix = (a, b, t) => a * (1 - t) + b * t;
const  lerp = mix;
const noise = Math.random, random = Math.random, rand = Math.random;
const   pow = Math.pow;
const round = (...x) => x.flat().map(Math.round);
const  sign = (...x) => x.flat().map(Math.sign);
const smooth = (a, b, t) => mix(a, b, t * t * (3 - 2 * t));
const smoothstep = smooth;
const  sqrt = (...x) => x.flat().map(Math.sqrt);
const  step = (t, x) => x < t ? 0 : 1;
const trunc = (...x) => x.flat().map(Math.trunc);
const truncate = trunc;
const norm = (...x) => x.flat().map(x => sin(x) * 0.5 + 0.5);

const  acos = (...x) => x.flat().map(Math.acos);
const acosh = (...x) => x.flat().map(Math.acosh);
const  asin = (...x) => x.flat().map(Math.asin);
const asinh = (...x) => x.flat().map(Math.asinh);
const  atan = (...x) => x.flat().map(Math.atan);
const atanh = (...x) => x.flat().map(Math.atanh);
const   cos = (...x) => x.flat().map(Math.cos);
const  cosh = (...x) => x.flat().map(Math.cosh);
const   deg = x => x * 180 / pi;
const degrees = deg;
const   rad = x => x * pi / 180;
const radians = rad;
const   sin = (...x) => x.flat().map(Math.sin);
const  sinh = (...x) => x.flat().map(Math.sinh);
const   tan = (...x) => x.flat().map(Math.tan);
const  tanh = (...x) => x.flat().map(Math.tanh);
const cotan = (...x) => x.flat().map(x => 1 / Math.tan(x));
const   sec = (...x) => x.flat().map(x => 1 / Math.cos(x));
const cosec = (...x) => x.flat().map(x => 1 / Math.sin(x));
const atan2 = Math.atan2;
