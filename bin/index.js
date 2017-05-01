#! /usr/bin/env node

var config = require("./config");
var ARGS = config.ARGS;

var generateProject = require(__dirname + "/actions/generateProject");
var generateComponent = require(__dirname + "/actions/generateComponent");
var generateReducer = require(__dirname + "/actions/generateReducer");
var generateConfig = require(__dirname + "/actions/generateConfig");

/**
 * parser
 *
 * @returns {undefined}
 */
function parser() {
  var commandP;

  if (ARGS[1] === undefined) {
    console.log(
      "Supported commands:\n" +
        "regen project <project name>\n" +
        "regen component <component name>\n" +
        "regen reducer <reducer name>\n"
    );
    return;
  }

  commandP = new RegExp(ARGS[1]);

  if (commandP.exec("project")) {
    generateProject();
  } else if (commandP.exec("component")) {
    generateComponent();
  } else if (commandP.exec("reducer")) {
    generateReducer();
  } else if (commandP.exec("config")) {
    generateConfig();
  } else {
    console.log(
      "Supported commands:\n" +
        "regen project <project name>\n" +
        "regen component <component name>\n" +
        "regen reducer <reducer name>\n"
    );
  }
}

parser();
