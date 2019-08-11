const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const OUTPUT_DIR = './';
const INPUT_DIRS = ['./assets'];

const options = {
  pngQuant: {
    quality: [0.7, 0.8]
  },
  svgo: {
    removeViewBox: true
  },
};

/**
 * Helper functions to get directories / sub-directories
 *
 * @see https://stackoverflow.com/a/40896897/4364074
 */
const isDirectory = source => lstatSync(source).isDirectory();

const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);

const getDirectoriesRecursive = source => [
  source,
  ...getDirectories(source)
    .map(getDirectoriesRecursive)
    .reduce((a, b) => a.concat(b), [])
];

try {
  console.log('Beginning image compression...');

  (async () => {
    let imageDirs = [];

    INPUT_DIRS.map(
      dirname =>
        (imageDirs = imageDirs.concat(getDirectoriesRecursive(dirname)))
    );

    for (let i in imageDirs) {
      const dir = imageDirs[i];

      await imagemin([`${dir}/*.{png,svg}`], {
        destination: join(OUTPUT_DIR, dir),
        plugins: [
          imageminPngquant(options.pngQuant),
          imageminSvgo(options.svgo)
        ]
      });

      console.log(`...${(((+i + 1) / imageDirs.length) * 100).toFixed(0)}%`);
    }

    console.log('Finished compressing all images.');
  })();
} catch (e) {
  console.log(e);
}