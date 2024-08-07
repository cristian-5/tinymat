
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
