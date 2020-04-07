const aws = require("aws-sdk");
const { formatEmailBody, formatResult } = require("./formatters");

const { EMAIL_CC, EMAIL_SOURCE, EMAIL_TO, REGION } = process.env;

const ses = new aws.SES({ region: REGION });

module.exports = async ({ added, updated }) => {
  const params = {
    Destination: {
      ToAddresses: EMAIL_TO.split(";"),
      CcAddresses: EMAIL_CC.split(";"),
    },
    Message: {
      Body: {
        Html: {
          Data: formatEmailBody({
            added: added.map(formatResult),
            updated: updated.map(formatResult),
          }),
        },
      },

      Subject: { Data: `Tesla -- New/Updated Car Alert` },
    },
    Source: EMAIL_SOURCE,
  };

  return ses.sendEmail(params).promise();
};
