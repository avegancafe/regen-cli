#! /usr/bin/env node
console.log("Hello, world!")

let args = process.argv.slice(1)

/**
 * component
 *
 * @param {string} name name of the new component to create
 */
function component(name) {

}

/**
 * project
 *
 * @param {string} name name of the new project to create
 */
function project(name) {

}

/**
 * parser
 *
 * @param {array} args list of args passed into binary
 */
function parser(args) {
  console.log(args)
  return args
}

parser(args)
