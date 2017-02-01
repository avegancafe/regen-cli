#! /usr/bin/env node

var config = require("./config")
var ARGS = config.ARGS

var generateProject = require(__dirname + "/actions/generateProject")
var generateComponent = require(__dirname + "/actions/generateComponent")

/**
 * parser
 *
 * @param {array} allArgs list of args passed into binary
 * @returns {undefined}
 */
function parser() {
  switch(ARGS[1]) {
  case "project":
    generateProject()
    break
  case "component":
    generateComponent()
    break
  default:
    console.log("Supported commands:\n" +
      "regen project <project name>\n" +
      "regen component <component name>"
    )
  }
}

parser()
