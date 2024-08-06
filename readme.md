
# ⚪️ tinymat

A tiny ⛳️ code golfing matrix platform made with ❤️ and dedication.

> 🌈 **Ab_se the sh\*t out of js syntax and make your trip come to life!**

> The parameters can be: `x` `y` for integer indices, `t` for time in
> seconds, `i` for a single index, `u` `v` for uv coordinates.\
> The return value can be a number that indicates a grayscale\
> value, `[grayscale, size]`, `[r, g, b]`, or `[x, y, z, size]`.\
> Color values and sizes are in the range of `0` to `1`.\
> Functions can operate on arrays or variardic arguments.

### tiny examples

```js
(x, y, t) => [cos(y*t),sin(x*t),1,sin(t)]
```

```js
(x, y, t) => -sin(y*t)
```

```js
(x, y, t) => [cos(t*x)-sin(y*t),sin(t)]
```

```js
(x, y, t) => norm(sin(x)*norm(t),norm(t+x),norm(t*y),sin(t*(y+x)/5))
```
