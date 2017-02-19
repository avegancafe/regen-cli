var _ = require("lodash");
var fs = require("fs");
var mkdirp = require("mkdirp");
var parentPackagePath = require("parent-package-json");
var path = require("path");

var config = require("../config");
var OPTS = config.OPTS;
var ARGS = config.ARGS;
var TEMPLATE_DIR = config.TEMPLATE_DIR;

/**
 * generateComponent
 *
 * @param {string} name name of the new component to create
 * @returns {undefined}
 */
function generateComponent() {
  var name = ARGS[2];
  var BASE_PATH = parentPackagePath();
  var inProject = false;

  if (fs.existsSync("./package.json")) {
    inProject = true;
    BASE_PATH = "./src/javascripts/components/";
  } else if (BASE_PATH !== false) {
    BASE_PATH = BASE_PATH.path.split("package.json")[0] +
      "src/javascripts/components/";
    inProject = true;
  }

  if (!inProject) {
    console.log("No package.json was found and you are not in a project");
    return;
  }

  if (fs.existsSync(`${BASE_PATH}${name}`)) {
    console.log(`The file ./src/component/${name} already exists.`);
    return;
  }

  if (
    !fs.existsSync(`${BASE_PATH}${/(.*)\/?.*$/.exec(name)[1]}`) &&
      /\//.test(name)
  ) {
    mkdirp(`${BASE_PATH}${/(.*)\/.*$/.exec(name)[1]}`);
  }

  console.log(`Generating component ${name}`);
  fs.readFile(
    path.join(
      TEMPLATE_DIR,
      _.includes(OPTS, "-f") ? "functionalComponent.js" : "component.js"
    ),
    function(err, data) {
      fs.writeFileSync(
        `${BASE_PATH}${name}.js`,
        data.toString().replace(/{{class_name}}/g, /([^\/]*)$/.exec(name)[1])
      );
    }
  );
}

module.exports = generateComponent;
