#! /usr/bin/env node

var _ = require("lodash")
var fs = require("fs")
var mkdirp = require("mkdirp")
var ncp = require("ncp")
var parentPackagePath = require("parent-package-json")
var path = require("path")

var ALL_ARGS = process.argv.slice(1)
var TEMPLATE_DIR = path.join(
  __dirname,
  "..",
  "templates"
)

/**
 * generateComponent
 *
 * @param {string} name name of the new component to create
 * @param {object} opts option flags passed in to regen
 * @returns {undefined}
 */
function generateComponent(name, opts) {
  var BASE_PATH = parentPackagePath()
  if (BASE_PATH === false) {
    console.log("No package.json was found")
    return
  } else {
    try {
      fs.statSync('./package.json')
      BASE_PATH = './src/javascripts/components/'
    } catch (e) {
      BASE_PATH = BASE_PATH.path.split('package.json')[0] + 'src/javascripts/components/'
    }
  }

  try {
    fs.statSync(BASE_PATH)
  } catch (e) {
    console.log(`The path ${BASE_PATH} does not exist.`)
    return
  }

  try {
    fs.statSync(`${BASE_PATH}${name}`)
    console.log(`The file ./src/component/${name} already exists.`)
    return
  } catch (e) {}

  try {
    fs.statSync(`${BASE_PATH}${/(.*)\/?.*$/.exec(name)[1]}`)
  } catch (e) {
    if (/\//.test(name)) {
      mkdirp(`${BASE_PATH}${/(.*)\/.*$/.exec(name)[1]}`)
    }
  }

  console.log(`Generating component ${name}`)
  fs.readFile(path.join(
    TEMPLATE_DIR,
    _.includes(opts, "-f") ? "functionalComponent.js" : "component.js"
  ), function (err, data) {
    fs.writeFileSync(
      `${BASE_PATH}${name}.js`,
      data.toString().replace(/{{class_name}}/g, /([^\/]*)$/.exec(name)[1])
    )
  })
}

/**
 * generateProject
 *
 * @param {string} name name of the new project to create
 * @returns {undefined}
 */
function generateProject(name) {
  try {
    fs.statSync(`./${name}`)
    console.log(`${name} already exists or is not empty`)
    return
  } catch (e) {
    fs.mkdirSync(name)
  }

  console.log(`Generating project ${name}`)

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
      )
    })
  })
}

/**
 * parser
 *
 * @param {array} allArgs list of args passed into binary
 * @returns {undefined}
 */
function parser(allArgs) {
  var opts = allArgs.filter(function (el) {
    return el.match(/^-/)
  })

  var args = allArgs.filter(function (el) {
    return !el.match(/^-/)
  })

  switch(args[1]) {
  case "project":
    generateProject(args[2])
    break
  case "component":
    generateComponent(args[2], opts)
    break
  default:
    console.Log("Supported commands:\n" +
      "regen project <project name>\n" +
      "regen component <component name>"
    )
  }
}

parser(ALL_ARGS)
