#!/usr/bin/env bash
# Frontend Docker entrypoint

# Exit on failure
set -e

make

# Run the command passed as args to this script
exec "$@"
