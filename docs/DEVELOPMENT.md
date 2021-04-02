# Development

## Environment

- Node 10 (@10.15.3)

## Coding Set
Using the following syntax style

- ES2015
- babel preset [stage-2](https://babeljs.io/docs/plugins/preset-stage-2/)

## Stacks

- [react](https://github.com/facebook/react) as major tool for building user interfaces

## Tasks
There are several npm tasks to cover from development and build.

1. Lint
Using [eslint](http://eslint.org/) for the code and ensure the coding format and style.
config: `.eslintrc`
task: `npm run lint`

2. Dev
Start a dev server. Use gulp task with code change watching and Webpack Hot Reload.
task: `npm run dev`

3. Build
Build the project.
task: `npm run build`

## Prerequisites

Install [gulp](http://gulpjs.com/)

```
npm install -g gulp
```

Need `env` file to mention the environment.

### Optional

[Node Version Manager (nvm)](https://github.com/creationix/nvm)

*NOTE* for Homebrew users:

```
// make sure to follow post-installation instructions
brew install nvm

cd <PROJECT_ROOT>
// use the version specified in .nvmrc
nvm use

## Setup

Install the dependencies

```
npm install
```

Download Intl message data
```
gulp intl:download
```

## Run the application for development

```
npm run dev
```
