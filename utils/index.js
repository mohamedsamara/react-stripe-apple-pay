const paths = require("./paths");
const isDev = process.env.NODE_ENV === "development";
const publicPath = process.env.PUBLIC_PATH || "/";

module.exports = {
  isDev,
  paths,
  publicPath,
};
