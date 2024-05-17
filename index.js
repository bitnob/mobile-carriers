const mobileCarriers = require('./carriers.json');

// Find network by phone number and country code
function findNetworkByPhoneNumber(phoneNumber, countryCode) {
    console.log(phoneNumber, countryCode)
    for (const country in mobileCarriers) {
        if (mobileCarriers[country].countryCode === countryCode) {
            for (const network in mobileCarriers[country].networks) {
                const prefixes = mobileCarriers[country].networks[network].prefixes;
                const prefixFound = prefixes.find(prefix => phoneNumber.startsWith(prefix));
                if (prefixFound) {
                    return network; //modify response data
                }
            }
        }
    }
    return "Network not found";
}

function extractCountryCode(phoneNumber) {
    const phonePrefixRegex = /^\+?(\d{1,3})/;
    const match = phoneNumber.match(phonePrefixRegex);
    return match ? (match[0].startsWith('+') ? match[0] : `+${match[1]}`) : null;
}

function localizedPhoneNumber(phoneNumber) {
    const countryCodeRegex = /^\+\d{1,3}/;
    const localPhoneNumber = phoneNumber.replace(countryCodeRegex, '');
    return localPhoneNumber.startsWith('0') ? localPhoneNumber : '0' + localPhoneNumber;
}

function phoneNumberLookup(phoneNumber) {
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
        isValid
    };

    console.log(response);
    return response;
}

function hasMobileMoney(countryCode, networkName) {
    const country = getCountryByCode(countryCode);
    if (!country) return null;

    const normalizedNetworkName = networkName.toLowerCase();
    for (const telco in country.networks) {
        if (telco.toLowerCase() === normalizedNetworkName) {
            return country.networks[telco]['mobile money'];
        }
    }

    return null;
}

// Validate the phone number using the country's regex pattern
function validatePhoneNumber(phoneNumber) {
    const countryCode = extractCountryCode(phoneNumber);
    if (!countryCode) return false;

    const country = getCountryByCode(countryCode);
    if (!country) return false;

    const regexString = country.regex;
    if (!regexString) return false;

    const regex = new RegExp(regexString.replace(/\\\\/g, '\\'));
    const normalizedPhoneNumber = phoneNumber.replace(countryCode, '').replace(/^0/, '');

    return regex.test(countryCode + normalizedPhoneNumber);
}

// Get country details by country code
function getCountryByCode(countryCode) {
    for (const country in mobileCarriers) {
        if (mobileCarriers[country].countryCode === countryCode) {
            return mobileCarriers[country];
        }
    }
    return null;
}

// Get the telcos in a country using the country code
function getTelcosByCountry(countryCode) {
    return getCountryByCode(countryCode) || null;
}

// Get a telco by the phone number
function getTelcoByPhoneNumber(phoneNumber) {
    const countryCode = extractCountryCode(phoneNumber);
    if (!countryCode) return null;

    const country = getCountryByCode(countryCode);
    if (!country) return null;

    const localPhoneNumber = localizedPhoneNumber(phoneNumber);
    for (const telco in country.networks) {
        const prefixes = country.networks[telco].prefixes;
        if (prefixes.some(prefix => localPhoneNumber.startsWith(prefix))) {
            return telco;
        }
    }
    return null;
}


// return all prefixes for a given network
function getNetworkPrefixes(networkName) {
    const capitalizedNetworkName = networkName.charAt(0).toUpperCase() + networkName.slice(1).toLowerCase();
    const prefixes = [];
    for (const country in mobileCarriers) {
        for (const network in mobileCarriers[country].networks) {
            if (network.toLowerCase() === capitalizedNetworkName.toLowerCase()) {
                prefixes.push(...mobileCarriers[country].networks[network].prefixes);
            }
        }
    }
    return prefixes.length ? prefixes : "No prefixes found for this network";
}



// Networks offering mobile money services in a specific country
function getMobileMoneyNetworks(country) {
    const capitalizedCountryName = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
    const networks = mobileCarriers[capitalizedCountryName]?.networks;
    return Object.keys(networks).filter(network => networks[network]['mobile money']);
}

//  countries where a specific network is present e.g passing MTN shows all countries where MTN is present
function getCountriesWithNetwork(networkName) {
    const countries = [];
    for (const country in mobileCarriers) {
        const networks = mobileCarriers[country].networks;
        if (networks.hasOwnProperty(networkName)) {
            countries.push(country);
        }
    }
    return countries;
}

module.exports = {
    findNetworkByPhoneNumber,
    getNetworkPrefixes,
    getMobileMoneyNetworks,
    getCountriesWithNetwork,
    phoneNumberLookup,
    validatePhoneNumber,
    getTelcoByPhoneNumber,
    getTelcosByCountry
};
