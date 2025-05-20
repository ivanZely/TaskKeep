#!/bin/bash
set -e

host="$1"
shift
cmd="$@"

# Hardcoded valores para depurar correctamente
PGUSER="taskkeep"
PGPASSWORD="secret"
PGDATABASE="taskkeep"

echo "Esperando a que Postgres en $host esté disponible..."

until PGPASSWORD=$PGPASSWORD psql -h "$host" -U "$PGUSER" -d "$PGDATABASE" -c '\q' 2>/dev/null; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd
