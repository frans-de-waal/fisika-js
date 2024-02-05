# Fisika

A lightweight 2D physics engine.

Inspired by Burak Kanber's article [How Physics Engines Work](http://buildnewgames.com/gamephysics/).

## Development

Running the examples locally:

```bash
npm run dev
```

The example pages are served at [http://localhost:8080/examples/](http://localhost:8080/examples/).

## TODOs

### Bugs

- Fix (?) drag calculation.
- Update collisions to:
  - Better handle collisions of multiple entities.
  - Improve error correction on collisions.

### Improvements

- Collisions between different types of entities, e.g spheres, boxes, polygons maybe?
- Rigid bodies (rotation).
- Package the module and deploy to NPM
- Clean up the examples to all use the latest features of the module.
