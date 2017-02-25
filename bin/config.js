var path = require("path");

var ALL_ARGS = process.argv.slice(1);
var TEMPLATE_DIR = path.join(
  __dirname,
  "..",
  "templates"
);
var OPTS = ALL_ARGS.filter(function (el) {
  return el.match(/^-/);
});

var ARGS = ALL_ARGS.filter(function (el) {
  return !el.match(/^-/);
});

module.exports = {
  OPTS: OPTS,
  ARGS: ARGS,
  TEMPLATE_DIR: TEMPLATE_DIR
};

