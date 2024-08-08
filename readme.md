
# ⚪️ tinymat

A tiny ⛳️ code golfing matrix platform made with ❤️ and dedication.

> 🌈 **Ab_se the sh\*t out of js syntax and make your trip come to life!**

### parameters

The parameters can be used in any order and combination.\
Invalid parameter names will evaluate to `0`.

- `n`: the number of the bubble being rendered.
- `t`: the time in seconds.
- `x`, `y`: for cartesian coordinates between `-0.5` and `+0.5`.
- `j`, `i`: for the screen indices of the bubble in the matrix.
- `u`, `v`: for the cartesian 3rd quadrant coordinates, between `0` and `1`.
- `r`, `p`: for the polar coordinates centered.

### return value

- `[grayscale]`: a grayscale value between `0` and `1`.
- `[grayscale, size]`: a grayscale value and size between `0` and `1`.
- `[r, g, b]`: color values between `0` and `1`.
- `[r, g, b, size]`: color values and size between `0` and `1`.

### functions

JavaScript math functions can be used in the code without the `Math.` prefix,
and most of them also accept arrays and variadic arguments. In addition to
that, we added the following functions and shorthands:

```js
norm = x => sin(x) * 0.5 + 0.5
lerp = mix = (a, b, t) => a * (1 - t) + b * t
noise = rand = random = Math.random
step = (a, x) => x < a ? 0 : 1
smoothstep = (a, b, t) => mix(a, b, t * t * (3 - 2 * t))
deg = rad => rad * 180 / pi
rad = deg => deg * pi / 180
clamp = (x, a, b) => x < a ? a : x > b ? b : x
isinf = x => !isFinite(x)
isnan = x => isNaN(x)
```

### tiny examples

```js
(j,i,t)=>[cos(i*t),sin(j*t),1,sin(t)]
```

```js
(x,y,t)=>norm(x,y,0,t)
```

```js
(j,i,t)=>[cos(t*j)-sin(i*t),sin(t)]
```

```js
(u,v,t)=>[cotan(u+v*t,u^v,v*u*t),sqrt(tan(t*u*v))]
```

```js
(r,p,t)=>[sqrt(norm(2*t)),sin(t*r),r,norm(r**norm(t)*(1+sqrt(norm(2*t))))]
```
