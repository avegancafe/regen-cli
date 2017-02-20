var fs = require("fs");
var ncp = require("ncp");
var path = require("path");

var config = require("../config");
var TEMPLATE_DIR = config.TEMPLATE_DIR;
var ARGS = config.ARGS;

/**
 * generateProject
 *
 * @returns {undefined}
 */
function generateProject() {
  var name = ARGS[2];

  if (fs.existsSync(`./${name}`)) {
    console.log(`${name} already exists or is not empty`);
    return;
  } else {
    fs.mkdirSync(name);
  }

  console.log(`Generating project ${name} 🎉`);

  fs.readFile(path.join(TEMPLATE_DIR, "project", "package.json"), function(
    err,
    data
  ) {
    ncp(path.join(TEMPLATE_DIR, "project"), `./${name}`, function() {
      fs.writeFileSync(
        `./${name}/package.json`,
        data.toString().replace("{{project_name}}", name)
      );
    });
  });
}

module.exports = generateProject;
