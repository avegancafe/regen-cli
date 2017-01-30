# regen-cli
An opinionated React CLI

##Installation

```bash
npm install --global regen-cli
```

##Usage

There are two commands:

```bash
regen project <project name>
regen component <component name>
```

###`regen project <project name>`
Generate a new React project with the name `<project name>`

To set up your project after generating all of the source and config files,
you will need to go into your new directory and run `yarn install` to install
all of your node modules. To start development, use `webpack-dev-server`, which
is a dev dependency of your new project, so you can now run
`./node_modules/.bin/webpack-dev-server`
- Expects there to be no folder with name `<project name>`
in the current folder.

###`regen component <component name>`
Generate a new React component with the name `<component name>`
- Will put a React component with the name `<component name>`
in `<project root>/src/client/app/javascripts/components/` if it can find a project root.
If not, it'll say that it cannot find a `package.json`.
- Passing the `-f` flag to `regen component <component name>` will create a stateless
functional component instead.
