const fetchAvailableCars = require("./fetchAvailableCars");
const { getRecords, saveRecords } = require("./records");
const sendEmail = require("./sendEmail");
const sendSMS = require("./sendSMS");

const handler = async () => {
  const results = await fetchAvailableCars();
  let records = await getRecords();

  const added = results.filter(({ VIN }) => !records[VIN]);

  const updated = results
    .filter(
      ({ Price, VIN }) => !!records[VIN] && records[VIN][0].price !== Price
    )
    .map((result) => ({
      ...result,
      PreviousPrice: records[result.VIN][0].price,
    }));

  if (added.length === 0 && updated.length === 0) {
    return;
  }

  await sendEmail({ added, updated });
  await sendSMS();

  for (const { Price, VIN } of added) {
    records[VIN] = [{ date: new Date().toISOString(), price: Price }];
  }

  for (const { Price, VIN } of updated) {
    records[VIN] = [
      { date: new Date().toISOString(), price: Price },
      ...records[VIN],
    ];
  }

  await saveRecords(records);
};

module.exports = { handler };
