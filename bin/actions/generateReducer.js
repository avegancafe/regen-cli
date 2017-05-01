var fs = require("fs");
var mkdirp = require("mkdirp");
var parentPackagePath = require("parent-package-json");
var path = require("path");

var config = require("../config");
var ARGS = config.ARGS;
var TEMPLATE_DIR = config.TEMPLATE_DIR;


/**
 * readOpts
 *
 * Reads in .regenrc and extracts the reducers and actions path
 *
 * @returns {Object} object of type { reducersPath, actionsPath, basePath }
 */
function readOpts() {
  var basePath = parentPackagePath();
  var opts = {};
  var reducersPath;
  var actionsPath;
  var tmp;

  if (fs.existsSync("./package.json")) {
    basePath = "./src/javascripts/";
    reducersPath = basePath + "reducers/";
    actionsPath = basePath + "actions/";
    if (fs.existsSync("./.regenrc")) {
      opts = require("./.regenrc");
      if (opts.reducersPath) {
        reducersPath = opts.reducersPath;
      }

      if (opts.actionsPath) {
        actionsPath = opts.actionsPath;
      }
    }
  } else if (basePath !== false) {
    tmp = basePath.path.split("package.json")[0];
    basePath = tmp + "src/javascripts/";
    reducersPath = basePath + "reducers/";
    actionsPath = basePath + "actions/";
    if (fs.existsSync(tmp + ".regenrc")) {
      opts = require(tmp + ".regenrc");
      if (opts.reducersPath) {
        reducersPath = tmp + opts.reducersPath;
      }

      if (opts.actionsPath) {
        actionsPath = tmp + opts.actionsPath;
      }
    }
  } else {
    console.log("You are not currently in an node project.");
    return;
  }

  return {
    reducersPath: reducersPath,
    actionsPath: actionsPath,
    basePath: basePath
  };
}

/**
 * generateReducer
 *
 * @returns {undefined}
 */
function generateReducer() {
  var name = ARGS[2];
  var objName = /([^\/]*)$/.exec(name)[1];
  var camelCaseName = objName[0].toLowerCase() + objName.slice(1);

  var opts = readOpts();
  var basePath = opts.basePath;
  var reducersPath = opts.reducersPath;
  var actionsPath = opts.actionsPath;

  if (fs.existsSync(actionsPath + name)) {
    console.log("The file " + actionsPath+ name + "already exists.");
    return;
  }

  if (
    !fs.existsSync(basePath + /(.*)\/?.*$/.exec(name)[1]) &&
      /\//.test(name)
  ) {
    mkdirp(basePath + /(.*)\/.*$/.exec(name)[1]);
  }

  console.log("Generating reducer and action " + name);

  fs.readFile(path.join(TEMPLATE_DIR, "reducer.js"), function (err, data) {
    fs.writeFileSync(
      reducersPath + name + ".js",
      data
        .toString()
        .replace(/{{reducer_name}}/g, objName)
        .replace(/{{reducer_name_caps}}/g, objName.toUpperCase())
    );
  });

  fs.readFile(path.join(TEMPLATE_DIR, "action.js"), function (err, data) {
    fs.writeFileSync(
      actionsPath + name + ".js",
      data
        .toString()
        .replace(/{{reducer_name}}/g, objName)
        .replace(/{{reducer_name_caps}}/g, objName.toUpperCase())
    );
  });

  fs.readFile(path.join(reducersPath + "index.js"), function (err, data) {
    var fin = data.toString();
    var x = fin.indexOf("combineReducers\(");
    var i = x + fin.slice(x).indexOf(",\n}");
    var spaces = fin.slice(x).match(/\n(\s*)/)[1];
    var j = fin.indexOf(";") + 2;

    fin = fin.split("");
    fin.splice(i + 2, 0, spaces + camelCaseName + ",\n");
    fin = fin.join("");
    fs.writeFileSync(
      reducersPath + "index.js",
      fin.slice(0, j) +
        "import " + camelCaseName + " from './" + name + "';\n" +
        fin.slice(j)
    );
  });
}

module.exports = generateReducer;
