<<<<<<< HEAD

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
||||||| merged common ancestors
=======
# Brigadier: The JS library for Brigade

Brigadier is the events and jobs library for [Brigade](https://brigade.sh).

This is the core of the Brigadier library, but the Kubernetes runtime is part of Brigade itself.
To run a `brigade.js` file in Kubernetes, it will need to be executed within Brigade.

## What is Brigade?

Brigade is an event-driven serverless pipeline tool for Kubernetes. Use it to build CI/CD tools, ETL applications, big data chains, or for machine learning processing.

With Brigade, you can describe your pipeline in JavaScript, but each stage of the pipeline can be a completely stand-alone Docker container, written in whatever language you choose (including JS).

For examples of Brigade in action, visit [https://brigade.sh](https://brigade.sh).

## What is this library good for?

This library is useful for:

- testing `brigade.js` files
- extending Brigade's worker
- supporting code completion in tooling
- implementing alternative Brigade backends

Because there is no `JobRunner` implementation, executing `job.run()` is a no-op unless you override the appropriate methods on the `Job` class.

For an example of this library in action, see [brigtest](https://github.com/technosophos/brigtest).

## Installation

Install with Yarn, NPM, etc.:

```console
$ yarn add @brigadecore/brigadier
```

While this library is fairly stable, it is considered best to match the version of this library
to the version of Brigade that you are using.

## Usage

The API is the same here as in [Brigade's API](https://github.com/Azure/brigade/blob/master/docs/topics/javascript.md):

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

To learn more, visit the [official scripting guide](https://github.com/Azure/brigade/blob/master/docs/topics/scripting.md).
>>>>>>> docs(README): update README
