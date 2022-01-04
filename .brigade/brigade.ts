import { ConcurrentGroup, events, Event, Job } from "@brigadecore/brigadier"

const nodeImage = "node:12.22.7-bullseye"

// A map of all jobs. When a check_run:rerequested event wants to re-run a
// single job, this allows us to easily find that job by name.
const jobs: { [key: string]: (event: Event) => Job } = {}

const buildJobName = "build"
const buildJob = (event: Event) => {
  const job = new Job(buildJobName, nodeImage, event)
  job.primaryContainer.sourceMountPath = "/src"
  job.primaryContainer.workingDirectory = "/src"
  job.primaryContainer.command = ["sh"]
  job.primaryContainer.arguments = [
    "-c",
    "yarn install && yarn compile && yarn test"
  ]
  return job
}
jobs[buildJobName] = buildJob

const auditJobName = "audit"
const auditJob = (event: Event) => {
  const job = new Job(auditJobName, nodeImage, event)
  job.primaryContainer.sourceMountPath = "/src"
  job.primaryContainer.workingDirectory = "/src"
  job.primaryContainer.command = ["sh"]
  job.primaryContainer.arguments = [
    "-c",
    "yarn install && yarn audit"
  ]
  job.fallible = true
  return job
}
jobs[auditJobName] = auditJob

const publishJobName = "publish"
const publishJob = (event: Event, version: string) => {
  const job = new Job(publishJobName, nodeImage, event)
  job.primaryContainer.environment = {
    "VERSION": version,
    "NPM_TOKEN": event.project.secrets.npmToken
  }
  job.primaryContainer.sourceMountPath = "/src"
  job.primaryContainer.workingDirectory = "/src"
  job.primaryContainer.command = ["sh"]
  job.primaryContainer.arguments = [
    "-c",
    "yarn publish --new-version $(printf $VERSION | cut -c 2- ) --access public --no-git-tag-version"
  ]
  return job
}

async function runSuite(event: Event): Promise<void> {
  await new ConcurrentGroup( // Basic tests
    buildJob(event),
    auditJob(event)
  ).run()
}

// Either of these events should initiate execution of the entire test suite.
events.on("brigade.sh/github", "check_suite:requested", runSuite)
events.on("brigade.sh/github", "check_suite:rerequested", runSuite)

// This event indicates a specific job is to be re-run.
events.on("brigade.sh/github", "check_run:rerequested", async event => {
  // Check run names are of the form <project name>:<job name>, so we strip
  // event.project.id.length + 1 characters off the start of the check run name
  // to find the job name.
  const jobName = JSON.parse(event.payload).check_run.name.slice(event.project.id.length + 1)
  const job = jobs[jobName]
  if (job) {
    await job(event).run()
    return
  }
  throw new Error(`No job found with name: ${jobName}`)
})

events.on("brigade.sh/github", "release:published", async event => {
  const version = JSON.parse(event.payload).release.tag_name
  await publishJob(event, version).run()
})

events.process()
