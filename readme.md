
# tinymat

⚫️🔴🟤🟠🟡🟢🔵🟣⚪️

A tiny matrix code golfing platform made with ❤️

> The parameters are `x`, `y`, and `t` for time.\
> The return value can be a number that indicates a sphere grayscale
> value, `[grayscale, size]`, `[r, g, b]`, or `[x, y, z, size]`.\
> The color values and sizes are in the range of `0` to `1`.\

### Tiny Examples

`(x, y, t) =>`\
```js
[cos(y*t),sin(x*t),1,sin(t)]
```

`(x, y, t) =>`\
```js
-sin(y*t)
```

`(x, y, t) =>`\
```js
[cos(t*x)-sin(y*t),sin(t)]
```
