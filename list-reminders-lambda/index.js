const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // const { userId } = event;
        const userId = event.pathParameters?.["user-id"]; // ✅ this works with API Gateway

        if (!userId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing userId in request." })
            };
        }

        const params = {
            TableName: "Reminders",
            KeyConditionExpression: "userId = :uid",
            ExpressionAttributeValues: {
                ":uid": userId
            }
        };

        const result = await dynamo.query(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        };
    } catch (err) {
        console.error("Error listing reminders:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error." })
        };
    }
};
