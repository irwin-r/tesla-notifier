const mustache = require("mustache");
const template = require("./template");

const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "AUD",
});

const formatEmailBody = (data) => mustache.render(template, data);

const formatVIN = (vin) => vin.trim().toUpperCase();

const formatResult = (result) => ({
  interior: result.INTERIOR[0],
  model: result.TrimName,
  odometer: result.Odometer,
  odometerType: result.OdometerType,
  paint: result.PAINT[0],
  price: currencyFormat.format(result.Price),
  previousPrice: result.PreviousPrice
    ? currencyFormat.format(result.PreviousPrice)
    : undefined,
  token: result.token,
  vin: result.VIN,
  year: result.Year,
});

module.exports = {
  formatCurrency: currencyFormat.format,
  formatEmailBody,
  formatResult,
  formatVIN,
};
