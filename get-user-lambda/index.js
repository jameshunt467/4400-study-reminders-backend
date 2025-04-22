const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // const { userId } = event;
        const userId = event.pathParameters?.["user-id"];

        if (!userId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing userId in request." })
            };
        }

        const params = {
            TableName: "Users",
            Key: {
                userId: userId
            }
        };

        const result = await dynamo.get(params).promise();

        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "User not found." })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        };

    } catch (err) {
        console.error("Error fetching user:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error." })
        };
    }
};
