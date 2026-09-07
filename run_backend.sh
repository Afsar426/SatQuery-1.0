#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

if [ -f ".venv/bin/activate" ]; then
    source .venv/bin/activate
fi

export PYTHONPATH="$DIR"
echo "Starting SatQuery AI FastAPI Backend on http://0.0.0.0:8000 ..."
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload --reload-dir backend
