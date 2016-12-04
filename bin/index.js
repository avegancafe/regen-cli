#! /usr/bin/env node

var fs = require("fs");
var path = require("path");
var ncp = require("ncp");
var mkdirp = require("mkdirp");

var ALL_ARGS = process.argv.slice(1);
var TEMPLATE_DIR = path.join(
  __dirname,
  "..",
  "templates"
);

/**
 * generateComponent
 *
 * @param {string} name name of the new component to create
 * @returns {undefined}
 */
function generateComponent(name) {
  try {
    fs.statSync("./src/client/app/javascripts/components/");
  } catch (e) {
    console.log("The path ./src/client/app/javascripts/components/ does not exist.");
    return;
  }

  try {
    fs.statSync(`./src/client/app/component/${name}`);
    console.log(`The file ./src/client/app/component/${name} already exists.`);
    return;
  } catch (e) {}

  try {
    fs.statSync(`./src/client/app/javascripts/components/${/(.*)\/?.*$/.exec(name)[1]}`);
  } catch (e) {
    if (/\//.test(name)) {
      mkdirp(`./src/client/app/javascripts/components/${/(.*)\/.*$/.exec(name)[1]}`);
    }
  }

  console.log(`Generating component ${name}`);

  fs.readFile(path.join(
    TEMPLATE_DIR,
    "component.js"
  ), function (err, data) {
    fs.writeFileSync(
      `./src/client/app/javascripts/components/${name}.js`,
      data.toString().replace(/{{class_name}}/g, /([^\/]*)$/.exec(name)[1])
    );
  });
}

/**
 * generateProject
 *
 * @param {string} name name of the new project to create
 * @returns {undefined}
 */
function generateProject(name) {
  try {
    fs.statSync(`./${name}`);
    console.log(`${name} already exists or is not empty`);
    return;
  } catch (e) {
    fs.mkdirSync(name);
  }

  console.log(`Generating project ${name}`);

  fs.readFile(path.join(
    TEMPLATE_DIR,
    "project",
    "package.json"
  ), function (err, data) {
    ncp(path.join(
      TEMPLATE_DIR,
      "project"
    ), `./${name}`, function () {
      fs.writeFileSync(
        `./${name}/package.json`,
        data.toString().replace("{{project_name}}", name)
      );
    });
  });
}

/**
 * parser
 *
 * @param {array} args list of args passed into binary
 * @returns {undefined}
 */
function parser(args) {
  switch(args[1]) {
  case "project":
    generateProject(args[2]);
    break;
  case "component":
    generateComponent(args[2]);
    break;
  default:
    console.log("all the commands");
  }
}

parser(ALL_ARGS);
