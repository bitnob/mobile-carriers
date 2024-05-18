import mobileCarriers from "./carriers.json";
import { countryCodes } from "./constants";
interface Network {
  prefixes: string[];
  mobileMoney?: boolean;
}
interface Carrier {
  countryCode: string;
  isoCode: string;
  regex: string;
  networks: {
    [networkName: string]: Network;
  };
}

const mobileCarriersData: { [country: string]: Carrier } = mobileCarriers;

function extractCountryCode(phoneNumber: string): string | null {
    if (phoneNumber.length < 11) return "Invalid number format";
     
    if (!phoneNumber.startsWith("+")) {
        phoneNumber = "+" + phoneNumber;
    }

  for (const code of countryCodes) {
    if (phoneNumber.startsWith(code)) {
      return code;
    }
  }
  return null;
}

function localizedPhoneNumber(phoneNumber: string): string {
  const countryCodeRegex = /^\+\d{1,3}/;
  const localPhoneNumber = phoneNumber.replace(countryCodeRegex, "");
  return localPhoneNumber.startsWith("0")
    ? localPhoneNumber
    : "0" + localPhoneNumber;
}

function getCountryByCode(countryCode: string): Carrier | null {
  for (const country in mobileCarriersData) {
    if (mobileCarriersData[country].countryCode === countryCode) {
      return mobileCarriersData[country];
    }
  }
  return null;
}

function getTelcoByPhoneNumber(phoneNumber: string): string | null {
  const countryCode = extractCountryCode(phoneNumber);
  if (!countryCode) return null;

  const country = getCountryByCode(countryCode);
  if (!country) return null;

  const localPhoneNumber = localizedPhoneNumber(phoneNumber);
  for (const telco in country.networks) {
    const prefixes = country.networks[telco].prefixes;
    if (prefixes.some((prefix) => localPhoneNumber.startsWith(prefix))) {
      return telco;
    }
  }
  return null;
}

function getTelcosByCountry(countryCode: string): string[] | null {
  const country = getCountryByCode(countryCode);
  if (!country) return null;

  return Object.keys(country.networks);
}

function findNetworkByPhoneNumber(
  phoneNumber: string,
  countryCode: string
): string {
  const country = getCountryByCode(countryCode);
  if (!country) return "Network not found";

  const localPhoneNumber = localizedPhoneNumber(phoneNumber);
  for (const network in country.networks) {
    const prefixes = country.networks[network].prefixes;
    if (prefixes.some((prefix) => localPhoneNumber.startsWith(prefix))) {
      return network;
    }
  }
  return "Network not found";
}

function getNetworkPrefixes(networkName: string): string[] | string {
  const capitalizedNetworkName =
    networkName.charAt(0).toUpperCase() + networkName.slice(1).toLowerCase();
  const prefixes: string[] = [];
  for (const country in mobileCarriersData) {
    for (const network in mobileCarriersData[country].networks) {
      if (network.toLowerCase() === capitalizedNetworkName.toLowerCase()) {
        prefixes.push(
          ...mobileCarriersData[country].networks[network].prefixes
        );
      }
    }
  }
  return prefixes.length ? prefixes : "No prefixes found for this network";
}

function hasMobileMoney(
  countryCode: string,
  networkName: string
): boolean | null {
  const country = getCountryByCode(countryCode);
  if (!country) return null;

  const normalizedNetworkName = networkName.toLowerCase();
  for (const telco in country.networks) {
    if (telco.toLowerCase() === normalizedNetworkName) {
      return country.networks[telco].mobileMoney || false;
    }
  }
  return null;
}

function phoneNumberLookup(phoneNumber: string) {
    if (phoneNumber.length < 11) return "Invalid number format";
    const countryCode = extractCountryCode(phoneNumber);
    if (!countryCode) return "Invalid number format";

  const localPhoneNumber = localizedPhoneNumber(phoneNumber);
  const network = findNetworkByPhoneNumber(localPhoneNumber, countryCode);
  const mobileMoney = hasMobileMoney(countryCode, network);
  const isValid = validatePhoneNumber(phoneNumber);
  const response = {
    phoneNumber,
    countryCode,
    localPhoneNumber,
    network,
    mobileMoney,
    isValid,
  };
  return response;
}


function validatePhoneNumber(phoneNumber: string): boolean {
  const countryCode = extractCountryCode(phoneNumber);
  if (!countryCode) return false;

  const country = getCountryByCode(countryCode);
  if (!country) return false;

  const regexString = country.regex;
  if (!regexString) return false;

  const regex = new RegExp(regexString.replace(/\\\\/g, "\\"));
  const normalizedPhoneNumber = phoneNumber
    .replace(countryCode, "")
    .replace(/^0/, "");

  return regex.test(countryCode + normalizedPhoneNumber);
}

function getCountriesWithNetwork(networkName: string): string[] {
  const countriesWithNetwork: string[] = [];
  for (const country in mobileCarriersData) {
    const networks = mobileCarriersData[country].networks;
    if (networks.hasOwnProperty(networkName)) {
      countriesWithNetwork.push(country);
    }
  }
  return countriesWithNetwork;
}

function getMobileMoneyNetworks(countryName: string): string[] {
  const country = mobileCarriersData[countryName];
  if (!country) return [];

  return Object.keys(country.networks).filter(
    (network) => country.networks[network].mobileMoney
  );
}

export {
  extractCountryCode,
  localizedPhoneNumber,
  getCountryByCode,
  getTelcoByPhoneNumber,
  getTelcosByCountry,
  findNetworkByPhoneNumber,
  getNetworkPrefixes,
  hasMobileMoney,
  phoneNumberLookup,
  validatePhoneNumber,
  getCountriesWithNetwork,
  getMobileMoneyNetworks,
};
