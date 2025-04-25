const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        const { userId, email, name, createdAt } = event;

        if (!userId || !email || !name || !createdAt) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing required fields." })
            };
        }

        const params = {
            TableName: "Users",
            Item: {
                userId,
                email,
                name,
                createdAt
            }
        };

        await dynamo.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "User created successfully." })
        };

    } catch (err) {
        console.error("Error creating user:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error." })
        };
    }
};
