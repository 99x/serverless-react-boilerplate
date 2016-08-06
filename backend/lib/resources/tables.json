{
    "UsersTable": {
        "Type": "AWS::DynamoDB::Table",
        "DeletionPolicy": "Retain",
        "Properties": {
            "TableName": "${project}-users-${stage}",
            "AttributeDefinitions": [{
                "AttributeName": "id",
                "AttributeType": "S"
            }, {
                "AttributeName": "email",
                "AttributeType": "S"
            }],
            "KeySchema": [{
                "AttributeName": "id",
                "KeyType": "HASH"
            }],
            "ProvisionedThroughput": {
                "ReadCapacityUnits": 1,
                "WriteCapacityUnits": 1
            },
            "GlobalSecondaryIndexes": [{
                "IndexName": "emailIndex",
                "KeySchema": [{
                    "AttributeName": "email",
                    "KeyType": "HASH"
                }],
                "Projection": {
                    "ProjectionType": "ALL"
                },
                "ProvisionedThroughput": {
                    "ReadCapacityUnits": 1,
                    "WriteCapacityUnits": 1
                }
            }]
        }
    }
}
