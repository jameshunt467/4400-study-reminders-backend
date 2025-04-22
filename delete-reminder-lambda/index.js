const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        const reminderId = event.pathParameters?.["reminder-id"];
        const userId = event.queryStringParameters?.userId;

        if (!userId || !reminderId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing userId or reminderId." })
            };
        }

        const params = {
            TableName: "Reminders",
            Key: { userId, reminderId }
        };

        await dynamo.delete(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Reminder deleted successfully." })
        };

    } catch (err) {
        console.error("Error deleting reminder:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error." })
        };
    }
};
