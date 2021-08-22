const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async(event) => {
    var apiKey = event.requestContext.identity.apiKey;
    var body = JSON.parse(event.body);

    if (body.whereami) {

    }
    else {
        var response = await ddb.get({
            TableName: "email-form",
            Key: {
                context: apiKey,
                id: "config"
            }
        }).promise();

        if (response.Item) {
            var email = response.Item.email;
            var from = response.Item.from;

            var html = `<html><body>New message:<br/>Name: ${body.name}<br/>Email: ${body.email}<br/>Phone: ${body.phone}<br/>Subject: ${body.subject}<br/><hr/>${body.message}</body></html>`;

            var message = { cc: [], to: [email], html: html, subject: "New message on Website", from: `${from}<admin@krazyminds.com>` };

            var p1 = new AWS.SNS().publish({
                Message: JSON.stringify(message),
                TopicArn: "arn:aws:sns:ap-south-1:415731500432:send-mail"
            }).promise();

            var afterSevenDays = event.requestContext.requestTimeEpoch / 1000 + 7 * 86400;

            var p2 = ddb.put({
                TableName: "email-form",
                Item: {
                    context: apiKey,
                    id: event.requestContext.requestTimeEpoch + " " + event.requestContext.requestId.substring(0, 4),
                    message: message,
                    ttl: afterSevenDays
                }
            }).promise();

            var p3 = ddb.update({
                TableName: "email-form",
                Key: {
                    context: apiKey,
                    id: "config"
                },
                UpdateExpression: "set stats.emailCount = stats.emailCount + :o",
                ExpressionAttributeValues: {
                    ":o": 1
                },
                ReturnValues: "NONE"
            }).promise();

            await Promise.all([p1, p2, p3]);
        }

    }


    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "Success" })
    };
};
