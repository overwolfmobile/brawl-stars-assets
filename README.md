## Brawl Stars Game Assets

This repository contains all game assets in an optimized form````. 

Each picture for convenience has an id that matches the data that we get from the API or game files. 

Pictures can be presented in two formats:

- PNG in 3 resolutions (1x, 2x, 3x) or 1x with maximum resolution
- SVG for web use

Optimization of images takes place in 3 stages:

- Before commit (lint-staged + husky)
- Manually by the developer

Optimization plugins installed:

- PNGQuant
- SVGO

### Example Usage

1. Add this repository as git submodule

2. Require images directly from module

```js
const shellyIcon = require('../submodule/path/assets/brawler-icons/16000000.png')
```