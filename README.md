# Internarena
[![Build Status](http://ci.jrc.no/buildStatus/icon?job=internarena-autobuild)](http://ci.jrc.no/job/internarena-autobuild/)
[![Stories in Ready](https://badge.waffle.io/juniorconsulting/internarena.svg?label=ready&title=Ready)](http://waffle.io/juniorconsulting/internarena)


## Setup

* `git clone git@git.jrc.no:open-source/internarena.git`
* `npm install`
* `npm run dev`

The project should now be accessible from
[`localhost:8080`](localhost:8080). As you make changes to the code,
`npm run dev` will automatically rebuild and push the changes to the
browser. No need to reload the page.

## Architecture

Uses React, Redux and `react-router`.

## Development

Linting, `npm run lint`, should report no errors or warnings before
merging changes.  Also, to make it easier to enforce codestyle,
install an [Editorconfig](http://editorconfig.org/)-plugin for your
editor.

### High CPU usage


If `npm run dev` is using a lot of resources, run `npm install
fsevents`.  This allows `webpack-dev-server` to be notified of changes
to files, as opposed to polling.

### Tests

`npm test` or `npm run test:watch` to run tests.  All action creators
and reducers should be tested.

## Deployment / CI

Jenkins automatically tests all pull requests.  Commits to `master`
are automatically built and deployed to
[intern.jrc.no](http://intern.jrc.no).
