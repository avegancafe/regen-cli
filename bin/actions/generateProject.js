var fs = require("fs");
var ncp = require("ncp");
var path = require("path");
var execSync = require("child_process").execSync;

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
  }

  console.log("Generating project " + name + " 🎉");

  ncp(path.join(TEMPLATE_DIR, "project"), `./${name}`, function() {
    var data = fs.readFileSync(
      path.join(TEMPLATE_DIR, "project", "package.json")
    );

    fs.writeFile(
      "./" + name + "/package.json",
      data.toString().replace("{{project_name}}", name)
    );

    fs.readFile(path.join(TEMPLATE_DIR, "project", "gitignore"), function(
      err,
      data
    ) {
      fs.writeFile("./" + name + "/.gitignore", data.toString());
      fs.unlink("./" + name + "/gitignore");
      console.log(
        execSync(
          "bash -c 'hash tree 2> /dev/null && tree ./" + name + "'"
        ).toString()
      );
    });
  });
}

module.exports = generateProject;
