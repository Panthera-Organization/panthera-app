#!/bin/bash
bunx supabase gen types typescript \
  --project-id "$SUPABASE_PROJECT_ID" \
  --schema public > ./types/database.ts
echo "✅ Types synced"