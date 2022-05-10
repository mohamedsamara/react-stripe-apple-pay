const autoprefixer = require("autoprefixer");
const postcssnormalize = require("postcss-normalize");

module.exports = () => {
  return {
    plugins: [autoprefixer({}), postcssnormalize({})],
  };
};
