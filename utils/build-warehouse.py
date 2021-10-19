#!/usr/bin/env python3

# read demo.ddl and update the athena warehouse
import boto3
import sys

bucket = "s3://causalexample"
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


if __name__ == "__main__":
    # Athena can only process one statement at a time. Causal outputs the
    # ---- separator between statements
    ddl = open(sys.argv[1]).read().split("----")
    for stmt in ddl:
        run_query(stmt, "default", bucket + "/ddlexecution")
