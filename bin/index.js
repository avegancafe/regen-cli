#! /usr/bin/env node

var config = require("./config");
var ARGS = config.ARGS;

var generateProject = require(__dirname + "/actions/generateProject");
var generateComponent = require(__dirname + "/actions/generateComponent");
var generateReducer = require(__dirname + "/actions/generateReducer");

/**
 * parser
 *
 * @returns {undefined}
 */
function parser() {
  if (ARGS[1] === undefined) {
    console.log(
      "Supported commands:\n" +
        "regen project <project name>\n" +
        "regen component <component name>\n" +
        "regen reducer <reducer name>\n"
    );
    return;
  }

  var commandP = new RegExp(ARGS[1]);

  if (commandP.exec("project")) {
    generateProject();
  } else if (commandP.exec("component")) {
    generateComponent();
  } else if (commandP.exec("reducer")) {
    generateReducer();
  } else {
    console.log(
      "Supported commands:\n" +
        "regen project <project name>\n" +
        "regen component <component name>"
    );
  }
}

parser();
