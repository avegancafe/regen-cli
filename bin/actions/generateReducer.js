var fs = require("fs");
var mkdirp = require("mkdirp");
var parentPackagePath = require("parent-package-json");
var path = require("path");

var config = require("../config");
var ARGS = config.ARGS;
var TEMPLATE_DIR = config.TEMPLATE_DIR;

/**
 * generateReducer
 *
 * @returns {undefined}
 */
function generateReducer() {
  var name = ARGS[2];
  var BASE_PATH = parentPackagePath();
  var objName = /([^\/]*)$/.exec(name)[1];
  var camelCaseName = objName[0].toLowerCase() + objName.slice(1);

  if (fs.existsSync("./package.json")) {
    BASE_PATH = "./src/javascripts/";
  } else if (BASE_PATH !== false) {
    BASE_PATH = BASE_PATH.path.split("package.json")[0] + "src/javascripts/";
  } else {
    console.log("You are not currently in an node project.");
    return;
  }

  if (fs.existsSync(BASE_PATH + "actions/" + name)) {
    console.log("The file ./src/javascripts/actions/" + name + "already exists.");
    return;
  }

  if (
    !fs.existsSync(BASE_PATH + /(.*)\/?.*$/.exec(name)[1]) &&
      /\//.test(name)
  ) {
    mkdirp(BASE_PATH + /(.*)\/.*$/.exec(name)[1]);
  }

  console.log("Generating reducer and action " + name);

  fs.readFile(path.join(TEMPLATE_DIR, "reducer.js"), function (err, data) {
    fs.writeFileSync(
      BASE_PATH + "reducers/" + name + ".js",
      data
        .toString()
        .replace(/{{reducer_name}}/g, objName)
        .replace(/{{reducer_name_caps}}/g, objName.toUpperCase())
    );
  });

  fs.readFile(path.join(TEMPLATE_DIR, "action.js"), function (err, data) {
    fs.writeFileSync(
      BASE_PATH + "actions/" + name + ".js",
      data
        .toString()
        .replace(/{{reducer_name}}/g, objName)
        .replace(/{{reducer_name_caps}}/g, objName.toUpperCase())
    );
  });

  fs.readFile(path.join(BASE_PATH + "reducers/index.js"), function (err, data) {
    var fin = data.toString();
    var x = fin.indexOf("combineReducers\(");
    var i = x + fin.slice(x).indexOf(",\n}");
    var spaces = fin.slice(x).match(/\n(\s*)/)[1];
    var j = fin.indexOf(";") + 2;

    fin = fin.split("");
    fin.splice(i + 2, 0, spaces + camelCaseName + ",\n");
    fin = fin.join("");
    fs.writeFileSync(
      BASE_PATH + "reducers/index.js",
      fin.slice(0, j) +
        "import " + camelCaseName + " from './" + name + "';\n" +
        fin.slice(j)
    );
  });
}

module.exports = generateReducer;
