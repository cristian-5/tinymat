
# tinymat

⚫️🔴🟤🟠🟡🟢🔵🟣⚪️

A tiny matrix code golfing platform made with ❤️

> The parameters are `x`, `y`, and `t` for time.\
> The return value can be a number that indicates a sphere grayscale\
> value, `[grayscale, size]`, `[r, g, b]`, or `[x, y, z, size]`.\
> The color values and sizes are in the range of `0` to `1`.\

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
