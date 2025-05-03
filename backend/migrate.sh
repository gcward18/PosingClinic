#!/bin/bash

# Usage: ./run_migration.sh "your migration message here"

if [ -z "$1" ]; then
  echo "❌ Please provide a migration message."
  echo "Usage: ./run_migration.sh \"add new table\""
  exit 1
fi

MESSAGE="$1"

# Step 1: Create migration
echo "📦 Creating migration: $MESSAGE"
alembic revision --autogenerate -m "$MESSAGE"

# Step 2: Apply migration
echo "🚀 Applying migration..."
alembic upgrade head

echo "✅ Migration complete."
