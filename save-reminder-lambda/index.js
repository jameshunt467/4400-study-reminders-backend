// index.js
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        // This allows us to use direct CLI invocation + API Gateway
        const body = event.body ? JSON.parse(event.body) : event;

        const { userId, reminderId, title, timestamp, notes, status, type } = body;

        if (!userId || !reminderId || !title || !timestamp) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing required fields." })
            };
        }

        const params = {
            TableName: "Reminders",
            Item: {
                userId,
                reminderId,
                title,
                timestamp,
                notes: notes || null,
                status: status || "pending",
                type: type || null,
            }
        };

        await dynamo.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Reminder saved successfully." })
        };
    } catch (err) {
        console.error("Error saving reminder:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error." })
        };
    }
};
