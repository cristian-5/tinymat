
# ⚪️ tinymat

A tiny ⛳️ code golfing matrix platform made with ❤️ and dedication.

> 🌈 **Ab_se the sh\*t out of js syntax and make your trip come to life!**

### parameters

The parameters can be used in any order and combination.\
Invalid parameter names will evaluate to `0`.

- `n`: index number of the bubble being rendered.
- `t`: current time in seconds.
- `s`: start time in seconds.
- `d`: current date timestamp in seconds.
- `j`, `i`: for the screen indices of the bubble in the matrix.
- `x`, `y`: for cartesian coordinates between `-0.5` and `+0.5`.
- `u`, `v`: for the cartesian 3rd quadrant coordinates, between `0` and `1`.
- `r`, `p`: for the polar coordinates centered.

### return value

- `[grayscale]`: grayscale value between `0` and `1`.
- `[grayscale, size]`: grayscale value and size between `0` and `1`.
- `[r, g, b]`: color values between `0` and `1`.
- `[r, g, b, size]`: color values and size between `0` and `1`.

### functions

JavaScript math functions can be used in the code without the `Math.` prefix,
and most of them also accept arrays or variadic arguments.
The `^` operator now serves as the power operator, while `$` is promoted to xor.
In addition to that, we added the following functions: `norm`, `mix`, `noise`,
`clamp`, `step`, `smooth`, `deg`, `rad`.

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
