const aws = require("aws-sdk");

const { SMS_TO } = process.env;

const sns = new aws.SNS();

module.exports = async () =>
  sns
    .publish({
      Message: "NEW OR UPDATED CARS AVAILABLE",
      MessageAttributes: {
        "AWS.SNS.SMS.SenderID": {
          DataType: "String",
          StringValue: "TESLA",
        },
        "AWS.SNS.SMS.SMSType": {
          DataType: "String",
          StringValue: "Promotional",
        },
      },
      PhoneNumber: SMS_TO,
    })
    .promise();
