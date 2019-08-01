const { events, Job } = require("@brigadecore/brigadier")
const { Check } = require("@brigadecore/brigade-utils");

const projectName = "brigadier"

function build() {
    var build = new Job(`${projectName}-build`, "node:12.3.1-stretch");

    build.tasks = [
        "cd /src",
        "yarn install",
        "yarn compile",
        "yarn test",
        "yarn audit"
    ];

    return build;
}

function runSuite(e, p) {
    var check = new Check(e, p, build());
    check.run();
}

events.on("exec", runSuite);
events.on("check_suite:requested", runSuite);
events.on("check_suite:rerequested", runSuite);
events.on("issue_comment:created", (e, p) => Check.handleIssueComment(e, p, runSuite));
events.on("issue_comment:edited", (e, p) => Check.handleIssueComment(e, p, runSuite));
