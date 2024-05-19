"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMobileMoneyNetworks = exports.getCountriesWithNetwork = exports.validatePhoneNumber = exports.phoneNumberLookup = exports.hasMobileMoney = exports.getNetworkPrefixes = exports.findNetworkByPhoneNumber = exports.getTelcosByCountry = exports.getTelcoByPhoneNumber = exports.getCountryByCode = exports.localizedPhoneNumber = exports.extractCountryCode = void 0;
const carriers_json_1 = __importDefault(require("./carriers.json"));
const constants_1 = require("./constants");
const mobileCarriersData = carriers_json_1.default;
function extractCountryCode(phoneNumber) {
    if (phoneNumber.length < 11)
        return "Invalid number format";
    if (!phoneNumber.startsWith("+")) {
        phoneNumber = "+" + phoneNumber;
    }
    for (const code of constants_1.countryCodes) {
        if (phoneNumber.startsWith(code)) {
            return code;
        }
    }
    return null;
}
exports.extractCountryCode = extractCountryCode;
function localizedPhoneNumber(phoneNumber) {
    const countryCodeRegex = /^\+\d{1,3}/;
    const localPhoneNumber = phoneNumber.replace(countryCodeRegex, "");
    return localPhoneNumber.startsWith("0")
        ? localPhoneNumber
        : "0" + localPhoneNumber;
}
exports.localizedPhoneNumber = localizedPhoneNumber;
function getCountryByCode(countryCode) {
    for (const country in mobileCarriersData) {
        if (mobileCarriersData[country].countryCode === countryCode) {
            return mobileCarriersData[country];
        }
    }
    return null;
}
exports.getCountryByCode = getCountryByCode;
function getTelcoByPhoneNumber(phoneNumber) {
    const countryCode = extractCountryCode(phoneNumber);
    if (!countryCode)
        return null;
    const country = getCountryByCode(countryCode);
    if (!country)
        return null;
    const localPhoneNumber = localizedPhoneNumber(phoneNumber);
    for (const telco in country.networks) {
        const prefixes = country.networks[telco].prefixes;
        if (prefixes.some((prefix) => localPhoneNumber.startsWith(prefix))) {
            return telco;
        }
    }
    return null;
}
exports.getTelcoByPhoneNumber = getTelcoByPhoneNumber;
function getTelcosByCountry(countryCode) {
    const country = getCountryByCode(countryCode);
    if (!country)
        return null;
    return Object.keys(country.networks);
}
exports.getTelcosByCountry = getTelcosByCountry;
function findNetworkByPhoneNumber(phoneNumber, countryCode) {
    const country = getCountryByCode(countryCode);
    if (!country)
        return "Network not found";
    const localPhoneNumber = localizedPhoneNumber(phoneNumber);
    for (const network in country.networks) {
        const prefixes = country.networks[network].prefixes;
        if (prefixes.some((prefix) => localPhoneNumber.startsWith(prefix))) {
            return network;
        }
    }
    return "Network not found";
}
exports.findNetworkByPhoneNumber = findNetworkByPhoneNumber;
function getNetworkPrefixes(networkName) {
    const capitalizedNetworkName = networkName.charAt(0).toUpperCase() + networkName.slice(1).toLowerCase();
    const prefixes = [];
    for (const country in mobileCarriersData) {
        for (const network in mobileCarriersData[country].networks) {
            if (network.toLowerCase() === capitalizedNetworkName.toLowerCase()) {
                prefixes.push(...mobileCarriersData[country].networks[network].prefixes);
            }
        }
    }
    return prefixes.length ? prefixes : "No prefixes found for this network";
}
exports.getNetworkPrefixes = getNetworkPrefixes;
function hasMobileMoney(countryCode, networkName) {
    const country = getCountryByCode(countryCode);
    if (!country)
        return null;
    const normalizedNetworkName = networkName.toLowerCase();
    for (const telco in country.networks) {
        if (telco.toLowerCase() === normalizedNetworkName) {
            return country.networks[telco].mobileMoney || false;
        }
    }
    return null;
}
exports.hasMobileMoney = hasMobileMoney;
function phoneNumberLookup(phoneNumber) {
    if (phoneNumber.length < 11)
        return "Invalid number format";
    const countryCode = extractCountryCode(phoneNumber);
    if (!countryCode)
        return "Invalid number format";
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
exports.phoneNumberLookup = phoneNumberLookup;
function validatePhoneNumber(phoneNumber) {
    const countryCode = extractCountryCode(phoneNumber);
    if (!countryCode)
        return false;
    const country = getCountryByCode(countryCode);
    if (!country)
        return false;
    const regexString = country.regex;
    if (!regexString)
        return false;
    const regex = new RegExp(regexString.replace(/\\\\/g, "\\"));
    const normalizedPhoneNumber = phoneNumber
        .replace(countryCode, "")
        .replace(/^0/, "");
    return regex.test(countryCode + normalizedPhoneNumber);
}
exports.validatePhoneNumber = validatePhoneNumber;
function getCountriesWithNetwork(networkName) {
    const countriesWithNetwork = [];
    for (const country in mobileCarriersData) {
        const networks = mobileCarriersData[country].networks;
        if (networks.hasOwnProperty(networkName)) {
            countriesWithNetwork.push(country);
        }
    }
    return countriesWithNetwork;
}
exports.getCountriesWithNetwork = getCountriesWithNetwork;
function getMobileMoneyNetworks(countryName) {
    const country = mobileCarriersData[countryName];
    if (!country)
        return [];
    return Object.keys(country.networks).filter((network) => country.networks[network].mobileMoney);
}
exports.getMobileMoneyNetworks = getMobileMoneyNetworks;
