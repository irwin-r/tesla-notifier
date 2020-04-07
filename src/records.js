const aws = require("aws-sdk");

const { BUCKET } = process.env;

const s3 = new aws.S3();

const DATABASE_FILE_NAME = "records.json";

const getRecords = async () => {
  try {
    const response = await s3
      .getObject({ Bucket: BUCKET, Key: DATABASE_FILE_NAME })
      .promise();

    return JSON.parse(response.Body.toString()) || {};
  } catch (error) {
    if (error.statusCode !== 404) {
      throw error;
    }

    return {};
  }
};

const saveRecords = async (data = []) =>
  s3
    .putObject({
      Bucket: BUCKET,
      Key: DATABASE_FILE_NAME,
      Body: JSON.stringify(data),
      ContentType: "application/json",
    })
    .promise();

module.exports = { getRecords, saveRecords };
