> Note: This is the JS library for Brigade v1. For the Brigade v2-compatible
> Brigadier JS/TS library, see the corresponding
> [v2/brigadier](https://github.com/brigadecore/brigade/tree/v2/v2/brigadier)
> directory in the main Brigade repository, or seek out the v2.x releases on
> [Brigadier's npm site](https://www.npmjs.com/package/@brigadecore/brigadier).

# Brigadier: The JS library for Brigade

Brigadier is the events and jobs library for [Brigade](https://brigade.sh).

This is the core of the Brigadier library, but the Kubernetes runtime is part of Brigade itself.
To run a `brigade.js` file in Kubernetes, it will need to be executed within Brigade.

## What is it good for?

This library is useful for:

- testing `brigade.js` files
- extending Brigade's worker
- supporting code completion in tooling
- implementing alternative Brigade backends

Because there is no `JobRunner` implementation, executing `job.run()` is a no-op unless you override the appropriate methods on the `Job` class.

## Installation

[![NPM](https://nodei.co/npm/@brigadecore/brigadier.png)](https://www.npmjs.com/package/@brigadecore/brigadier)

Install with Yarn, NPM, etc.:

```console
$ yarn add @brigadecore/brigadier
```

While this library is fairly stable, it is considered best to match the version of this library
to the version of Brigade that you are using.


## Usage

The API is the same here as in [Brigade's API](https://docs.brigade.sh/topics/javascript):

```javascript
const {events, Job} = require("@brigadecore/brigadier");

events.on("push", (e, p) => {
    console.log("Got a push event");
    const j = new Job("example", "alpine:3.7");
    j.run().then((res) => {
        console.log(`result: ${ res.toString() } `)
    });
});
```

To learn more, visit the [official scripting guide](https://docs.brigade.sh/topics/scripting).

# Contributing

This Brigade project accepts contributions via GitHub pull requests. This document outlines the process to help get your contribution accepted.

## Signed commits

A DCO sign-off is required for contributions to repos in the brigadecore org.  See the documentation in
[Brigade's Contributing guide](https://github.com/brigadecore/brigade/blob/master/CONTRIBUTING.md#signed-commits)
for how this is done.
