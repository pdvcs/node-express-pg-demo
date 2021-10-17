#!/bin/bash
set -e

uuid=$(uuidgen)
dt=$(date +"%a %d %B %Y %T.%N %Z (%z)")
echo -n "$dt $uuid" | sha256sum | awk '{printf "%s", $1}'  > .localkey
echo "wrote .localkey to disk."
