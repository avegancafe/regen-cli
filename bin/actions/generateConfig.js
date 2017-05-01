var _ = require("lodash");
var fs = require("fs");
var mkdirp = require("mkdirp");
var parentPackagePath = require("parent-package-json");
var path = require("path");

var config = require("../config");
var ARGS = config.ARGS;
var TEMPLATE_DIR = config.TEMPLATE_DIR;

/**
 * generateConfig
 *
 */
function generateConfig() {
  var varsToSet = ARGS.slice(2, -1);
  var value = ARGS[ARGS.length-1];
  var basePath = parentPackagePath();
  var inProject = false;

  var opts = {};
  for (var i = varsToSet.length-1; i > -1; i--) {
    opts[varsToSet[i]] = value;
  }

  if (fs.existsSync("./package.json")) {
    inProject = true;
    basePath = "./";
  } else if (basePath !== false) {
    basePath = basePath.path.split("package.json")[0];
    inProject = true;
  }

  if (!inProject) {
    console.log("No package.json was found and you are not in a project");
    return;
  }

  if (fs.existsSync(path.join(basePath, ".regenrc.json"))) {
    var data = require(path.resolve(basePath + ".regenrc.json"));
    fs.writeFileSync(
      path.join(basePath, ".regenrc.json"),
      JSON.stringify(_.merge({}, data, opts))
    );
  } else {
    fs.writeFileSync(
      path.join(basePath, ".regenrc.json"),
      JSON.stringify(opts)
    )
  }
}

module.exports = generateConfig;

