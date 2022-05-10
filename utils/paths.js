const path = require("path");
const root = path.resolve(process.cwd());

const IMAGES = "images";
const FONTS = "fonts";
const BUILD = `${root}/build`;
const STATIC = `${BUILD}/static`;
const ClIENT = `${root}/client`;

const paths = {
  root: `${root}`,
  assets: `${root}/assets`,
  client: `${ClIENT}`,
  config: `${root}/config`,
  logs: `${root}/logs`,
  public: `${root}/public`,
  server: `${root}/server`,
  storage: `${root}/storage`,
  utils: `${root}/utils`,
  build: `${BUILD}`,
  static: `${STATIC}`,
  js: `js`,
  css: `css`,
  images: `${IMAGES}`,
  fonts: `${FONTS}`,
  images_build: `${STATIC}/${IMAGES}`,
  fonts_build: `${STATIC}/${FONTS}`,
  workbox: `${ClIENT}/workbox/index.ts`,
};

module.exports = paths;
