#!/bin/bash

# Update the Athena datawarehouse tables with the latest Causal generated DDL
# You will need the aws command to be configured with appropriate permissions

# This causes the script to fail and exit if any error occurs
set -euo pipefail

# IMPORTANT!
# set CAUSAL_SQL to the location of the generated SQL file
# In this example, assumed to be causal.sql and assumed to run
# In the directory where the generated sql file is
CAUSAL_SQL=causal.sql

# IMPORTANT!
# set OUTPUT_LOCATION to the location where you want athena responses to be placed
# the bucket below is an example and needs to be changed
OUTPUT_LOCATION=s3://causal-getting-started/ddlexecution/

# IMPORTANT!
# set DB_NAME to your database name
DB_NAME=getting_started

# create the database
# you only need to to do this once
aws athena start-query-execution --query-string "create database if not exists $DB_NAME;" --result-configuration "OutputLocation=$OUTPUT_LOCATION"

# temp directory to hold sql file for each statements
# athena command line does not work with multiple statements, it can only process one statement at a time
TMP_DIR=$(mktemp -d)

# split file into separate statements
# causal uses ---- to separate statements in the file
csplit --elide-empty-files --prefix $TMP_DIR/causalsplit --suffix-format='%05d.sql' $CAUSAL_SQL /----/ '{*}'

# execute each statement
# athena command line does not work with multiple statements, it can only process one statement at a time
for f in $TMP_DIR/*.sql; do
    echo "Processing $f file..";
    aws athena start-query-execution --query-string "$(<$f)" --result-configuration "OutputLocation=$OUTPUT_LOCATION" --query-execution-context Database=$DB_NAME
done

# cleanup
rm $TMP_DIR/causalsplit*.sql
rmdir $TMP_DIR
