const mobileCarriers = require('./carriers.json');

function getCarriersByCountry(country) {
  return mobileCarriers[country];
}

function getCarrierDetails(country, carrier) {
  if (mobileCarriers[country] && mobileCarriers[country][carrier]) {
    return mobileCarriers[country][carrier];
  } else {
    return null;
  }
}

module.exports = {
  getCarriersByCountry,
  getCarrierDetails
};
