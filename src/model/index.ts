import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const dynamoDBClient = (): DocumentClient => {
  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      // region: "localhost",
      // endpoint: "http://localhost:8000",
      region:process.env.dynamodbRegion,
      endpoint:process.env.dynamodbEndpoint,
    });
  }

  return new AWS.DynamoDB.DocumentClient();
};

export default dynamoDBClient
