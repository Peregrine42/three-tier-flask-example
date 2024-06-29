#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_ROOT_USER" --dbname "$POSTGRES_DATABASE" <<-EOSQL
  CREATE USER "$POSTGRES_APP_USER";
  ALTER USER "$POSTGRES_APP_USER" WITH PASSWORD '$POSTGRES_PASSWORD';
  ALTER USER "$POSTGRES_APP_USER" CREATEDB;
  CREATE DATABASE "$POSTGRES_APP_USER";
  GRANT ALL PRIVILEGES ON DATABASE "$POSTGRES_APP_USER" TO "$POSTGRES_APP_USER";
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_APP_USER" --dbname "$POSTGRES_APP_USER" <<-EOSQL
  CREATE SCHEMA "$POSTGRES_SCHEMA";
  GRANT USAGE ON SCHEMA "$POSTGRES_SCHEMA" TO "$POSTGRES_APP_USER";
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL