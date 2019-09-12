workflow "Build, Test, and Publish" {
  on = "push"
  resolves = [
    "Publish",
    "GitHub Action for npm",
  ]
}

action "Build" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "test"
}

# Filter for a new tag
action "Tag" {
  needs = [
    "Test",
    "GitHub Action for npm",
  ]
  uses = "actions/bin/filter@master"
  args = "tag"
}

action "Publish" {
  needs = "Tag"
  uses = "actions/npm@master"
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}

action "GitHub Action for npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Build"]
  args = "build"
}
