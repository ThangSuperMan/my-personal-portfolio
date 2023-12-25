#!/bin/bash

set -eu

function create_user_and_datebase() {
  local database=$1
  local user=$1
  echo "Create user and database: $database"
  
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    SELECT current_user;
    CREATE DATABASE $database;
    CREATE USER $user with password '$POSTGRES_NEW_DB_PASSWORD';
    GRANT ALL PRIVILEGES ON DATABASE $database TO $user;
EOSQL

  echo "Grant privilege schema public for user: $user"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -d "$database" <<-EOSQL
    SELECT current_user;
    GRANT CREATE ON SCHEMA public TO $user;
EOSQL
}

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
  echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"
  for db in $(echo "$POSTGRES_MULTIPLE_DATABASES" | tr  ',' ' '); do
    create_user_and_datebase "$db"
  done
  echo "Mutiple databases created"
fi
