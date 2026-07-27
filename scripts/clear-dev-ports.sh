#!/usr/bin/env bash
set -euo pipefail

ports=(3001 4999 5001 5100 5172 5173 5174 6006)

for port in "${ports[@]}"; do
  pids=$(lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null || true)

  if [[ -z "$pids" ]]; then
    continue
  fi

  for pid in $pids; do
    command_name=$(ps -p "$pid" -o comm= 2>/dev/null || true)

    if [[ "$command_name" == *node* ]]; then
      kill "$pid" 2>/dev/null || true
    fi
  done
done