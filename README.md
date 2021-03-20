# Simple Plausible Tracker
> Re-implemetation of the [Plausible Analytics tracker](https://github.com/plausible/analytics/blob/master/tracker/src/plausible.js), stripped to the bone

## Why?

I love Plausible Analytics, however, I needed to use send `pageview` events without including URLs that contained potentially personal information.

Plausible has a [page exclude feature](https://plausible.io/docs/excluding-pages) but this would mean I'd receive no page events for excluded pages.

### Why not fork?

Orginally [I forked the repo](https://github.com/anthonyec/analytics/blob/master/tracker/src/plausible.js#L20) but found it was hard to filter referrer URLs nicely and ensure I was not breaking other features.

I realised the official tracker is very simple, so decided to implement it myself. I get exactly what I need and nothing more.

## How to use
By default, firing events works exactly how Plausible Analytics does.

```js
const stats = createStats('https://example.com');

stats.fire('pageview');
```

### URL Filtering
Add a `urlFilter` function to page and referrer URLs. You can return any URL.

This is an example of how you might remove a user ID from a URL.
```js
// Find user IDs, e.g `user-948313`
const USER_ID_REGEX = /user-[0-9]{6}/g;

const stats = createStats('https://example.com', {
  urlFilter: (url) => {
    // Replace any user ID with the string `user`.
    return url.replace(USER_ID_REGEX, 'user');
  }
});

stats.fire('pageview');
```

