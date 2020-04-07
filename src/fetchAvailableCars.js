const { get } = require("got");
const { formatVIN } = require("./formatters");

const INVENTORY_RESULTS_URL =
  "https://www.tesla.com/inventory/api/v1/inventory-results";

const QUERY_PARAMETERS = {
  query: {
    model: "m3",
    options: { IsDemo: ["true"], ADL_OPTS: ["PERFORMANCE_UPGRADE"] },
    arrangeby: "Price",
    order: "asc",
    market: "AU",
    language: "en",
    super_region: "north america",
    lng: 147.6104,
    lat: -37.8229,
  },
  offset: 0,
  count: 5000,
  outsideOffset: 0,
  outsideSearch: false,
};

const searchParams = new URLSearchParams([
  ["query", JSON.stringify(QUERY_PARAMETERS)],
]);

module.exports = async () => {
  let results;

  try {
    const response = await get(INVENTORY_RESULTS_URL, {
      searchParams,
    }).json();

    results = response.results;

    // The API is a bit odd; it will give us an object sometimes? :|
    if (!Array.isArray(results)) {
      const { approximate = [], exact = [] } = results;

      results = [...approximate, ...exact];
    }
  } catch {
    results = [];
  }

  return results
    .filter(({ IsDemoVehicle }) => IsDemoVehicle)
    .map(({ VIN, ...result }) => ({ VIN: formatVIN(VIN), ...result }));
};
