#!/usr/bin/env python3

# read demo.ddl and update the athena warehouse
import boto3
import argparse
import sys
import re


bucket = "s3://causal-getting-started"
client = boto3.client('athena')


def run_query(query, database, s3_output):
    client = boto3.client('athena')
    response = client.start_query_execution(
        QueryString=query,
        QueryExecutionContext={
            'Database': database
        },
        ResultConfiguration={
            'OutputLocation': s3_output,
        }
    )
    print('Execution ID: ' + response['QueryExecutionId'])
    return response

def find_s3_root(filename):
    pattern = re.compile("'(s3://.*/)tables/.*';")

    for line in open(filename):
        for match in re.finditer(pattern, line):
            return match.group(1);
    return None
            
if __name__ == "__main__":

    parser = argparse.ArgumentParser(description='Executes Causal SQL statements to create tables in a database');
    parser.add_argument('sql_file', type=str, help='The sql file')
    parser.add_argument('--output-location', nargs='?', type=str, default=None, help='The query results output location (defaults to s3://<s3-bucket>/ddlexecution) ')
    parser.add_argument('--database', type=str, nargs='?', default="default", help='The database name (defaults to "default")')
    parser.add_argument('--create', action='store_true', help='Create the database if it does not already exist')
    parser.add_argument('--pretend', action='store_true', help='Show statements that would be executed')
    args = parser.parse_args()

    s3_base = find_s3_root(args.sql_file);
    if (s3_base == None):
        print ("could not find s3 root in sql file", file=sys.stderr)
        exit()

    if (args.output_location == None):
        output_location = find_s3_root(args.sql_file) + "ddlexecution"
    else:
        output_location = args.output_location

    print(f"Building warehouse:\n  SQL file={args.sql_file}\n  database={args.database}\n  create database={args.create}")
    print(f"  S3 base in SQL file={s3_base}\n  DDL result output location={output_location}\n  Pretend={args.pretend}")
        
    if (args.create):
        query = f"CREATE DATABASE IF NOT EXISTS {args.database};";
        if (args.pretend):
            print(query);
        else:
            client = boto3.client('athena')
            response=client.start_query_execution(
                QueryString=query,
                ResultConfiguration={
                    'OutputLocation': output_location,
                }
            )
            print('Execution ID: ' + response['QueryExecutionId'])

    # Athena can only process one statement at a time. Causal outputs the
    # ---- separator between statements
    ddl = open(args.sql_file).read().split("----")
    for stmt in ddl:
        if (args.pretend):
            print(stmt)
        else:
            run_query(stmt, args.database, output_location)
