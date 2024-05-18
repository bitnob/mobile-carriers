"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountriesWithNetwork = exports.getMobileMoneyNetworks = exports.getNetworkPrefixes = exports.getTelcoByPhoneNumber = exports.getTelcosByCountry = exports.getCountryByCode = exports.validatePhoneNumber = exports.hasMobileMoney = exports.phoneNumberLookup = exports.localizedPhoneNumber = exports.extractCountryCode = exports.findNetworkByPhoneNumber = void 0;
const carriers_json_1 = __importDefault(require("./carriers.json"));
const mobileCarriersData = carriers_json_1.default;
function findNetworkByPhoneNumber(phoneNumber, countryCode) {
    console.log(phoneNumber, countryCode);
    for (const country in mobileCarriersData) {
        if (mobileCarriersData[country].countryCode === countryCode) {
            for (const network in mobileCarriersData[country].networks) {
                const prefixes = mobileCarriersData[country].networks[network].prefixes;
                const prefixFound = prefixes.find(prefix => phoneNumber.startsWith(prefix));
                if (prefixFound) {
                    return network; // modify response data
                }
            }
        }
    }
    return "Network not found";
}
exports.findNetworkByPhoneNumber = findNetworkByPhoneNumber;
function extractCountryCode(phoneNumber) {
    const phonePrefixRegex = /^\+?(\d{1,3})/;
    const match = phoneNumber.match(phonePrefixRegex);
    return match ? (match[0].startsWith('+') ? match[0] : `+${match[1]}`) : null;
}
exports.extractCountryCode = extractCountryCode;
function localizedPhoneNumber(phoneNumber) {
    const countryCodeRegex = /^\+\d{1,3}/;
    const localPhoneNumber = phoneNumber.replace(countryCodeRegex, '');
    return localPhoneNumber.startsWith('0') ? localPhoneNumber : '0' + localPhoneNumber;
}
exports.localizedPhoneNumber = localizedPhoneNumber;
function phoneNumberLookup(phoneNumber) {
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
        isValid
    };
    console.log(response);
    return response;
}
exports.phoneNumberLookup = phoneNumberLookup;
function hasMobileMoney(countryCode, networkName) {
    const country = getCountryByCode(countryCode);
    if (!country)
        return null;
    const normalizedNetworkName = networkName.toLowerCase();
    for (const telco in country.networks) {
        if (telco.toLowerCase() === normalizedNetworkName) {
            return country.networks[telco]['mobileMoney'] || false;
        }
    }
    return null;
}
exports.hasMobileMoney = hasMobileMoney;
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
    const regex = new RegExp(regexString.replace(/\\\\/g, '\\'));
    const normalizedPhoneNumber = phoneNumber.replace(countryCode, '').replace(/^0/, '');
    return regex.test(countryCode + normalizedPhoneNumber);
}
exports.validatePhoneNumber = validatePhoneNumber;
function getCountryByCode(countryCode) {
    for (const country in mobileCarriersData) {
        if (mobileCarriersData[country].countryCode === countryCode) {
            return mobileCarriersData[country];
        }
    }
    return null;
}
exports.getCountryByCode = getCountryByCode;
function getTelcosByCountry(countryCode) {
    return getCountryByCode(countryCode);
}
exports.getTelcosByCountry = getTelcosByCountry;
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
        if (prefixes.some(prefix => localPhoneNumber.startsWith(prefix))) {
            return telco;
        }
    }
    return null;
}
exports.getTelcoByPhoneNumber = getTelcoByPhoneNumber;
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
function getMobileMoneyNetworks(country) {
    var _a;
    const capitalizedCountryName = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
    const networks = (_a = mobileCarriersData[capitalizedCountryName]) === null || _a === void 0 ? void 0 : _a.networks;
    return networks ? Object.keys(networks).filter(network => networks[network]['mobileMoney']) : [];
}
exports.getMobileMoneyNetworks = getMobileMoneyNetworks;
function getCountriesWithNetwork(networkName) {
    const countries = [];
    for (const country in mobileCarriersData) {
        const networks = mobileCarriersData[country].networks;
        if (networks.hasOwnProperty(networkName)) {
            countries.push(country);
        }
    }
    return countries;
}
exports.getCountriesWithNetwork = getCountriesWithNetwork;
