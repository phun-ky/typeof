#!/usr/bin/env bash
# Decide whether there is anything to release since the last release tag.
#
# Releases only when a non-merge commit since the last tag touches a published
# file (or a file the build reads) and is a feat/fix/perf/revert, uses `type!:`,
# or has a BREAKING CHANGE footer. The version increment itself is left to
# @release-it/conventional-changelog.
#
# Writes release=true|false to $GITHUB_OUTPUT when set.
# Exit codes: 0 = decided (release or skip), 2 = cannot decide.
# With --check, a skip exits 1 instead, so `should-release.sh --check && ...`
# only runs the next command when there is something to release.

set -euo pipefail

check=false
[[ "${1:-}" == "--check" ]] && check=true

# Files that end up in, or shape, the published package
published_paths=(
  src
  ':(exclude,glob)src/**/__tests__/**'
  package.json
  README.md
  LICENSE
  rollup.config.js
  tsconfig.json
)

decide() {
  local release=$1 reason=$2

  echo "should-release: release=${release} (${reason})"

  if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
    echo "release=${release}" >> "$GITHUB_OUTPUT"
  fi

  if [[ "$release" == false && "$check" == true ]]; then
    exit 1
  fi

  exit 0
}

if [[ "$(git rev-parse --is-shallow-repository)" == true ]]; then
  echo "should-release: shallow clone, tags and history are incomplete. Use actions/checkout with fetch-depth: 0." >&2
  exit 2
fi

# Release tags are plain semver (1.2.3), without a v prefix
last_tag=$(git tag --merged HEAD --sort=-v:refname | grep -E '^[0-9]+\.[0-9]+\.[0-9]+$' | head -n 1 || true)

if [[ -z "$last_tag" ]]; then
  decide true "no release tag found, first release"
fi

release_types='^(feat|fix|perf|revert)(\([^)]*\))?!?: '
breaking_header='^[a-z]+(\([^)]*\))?!: '
breaking_footer='^BREAKING[ -]CHANGE: '

while IFS= read -r -d '' commit; do
  sha=${commit%%$'\n'*}
  message=${commit#*$'\n'}
  subject=${message%%$'\n'*}

  if [[ "$subject" =~ $release_types || "$subject" =~ $breaking_header ]] \
    || grep -qE "$breaking_footer" <<< "$message"; then
    decide true "${sha:0:7} ${subject}"
  fi
done < <(git log -z --no-merges --format='%H%n%B' "${last_tag}..HEAD" -- "${published_paths[@]}")

decide false "no feat/fix/perf/revert or breaking change touching published files since ${last_tag}"
