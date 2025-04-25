const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        console.log("event.pathParameters", event.pathParameters);
        console.log("event.body", event.body);

        const reminderId = event.pathParameters?.["reminder-id"];
        const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        const { userId, title, timestamp, notes, status, type } = body;

        if (!userId || !reminderId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing userId or reminderId." })
            };
        }

        const params = {
            TableName: "Reminders",
            Key: { userId, reminderId },
            UpdateExpression: "set title = :t, #ts = :ts, notes = :n, #st = :s, #tp = :ty",
            ExpressionAttributeNames: {
                "#ts": "timestamp",
                "#st": "status",
                "#tp": "type"
            },                        
            ExpressionAttributeValues: {
                ":t": title,
                ":ts": timestamp,
                ":n": notes || "",
                ":s": status || "pending",
                ":ty": type || ""
            },
            ReturnValues: "UPDATED_NEW"
        };

        await dynamo.update(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Reminder updated successfully." })
        };

    } catch (err) {
        console.error("Error updating reminder:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error." })
        };
    }
};
