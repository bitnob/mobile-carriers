const mobileCarriers = require('./carriers.json');

// Find network by phone number and country code
function findNetworkByPhoneNumber(phoneNumber, countryCode = '') {
    // clean phone number 
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // extract the country code from the phone number if not provided
    if (!countryCode) {
        const possibleCode = phoneNumber.substring(0, 4);
        for (const country in mobileCarriers) {
            if (possibleCode.startsWith(mobileCarriers[country].countryCode.replace('+', ''))) {
                countryCode = mobileCarriers[country].countryCode;
                phoneNumber = phoneNumber.substring(countryCode.length - 1); // adjust index for '+'
                break;
            }
        }
    } else {
        countryCode = '+' + countryCode.replace(/\D/g, '');
    }
    if (!countryCode.startsWith('+')) {
        countryCode = '+' + countryCode;
    }
    for (const country in mobileCarriers) {
        if (mobileCarriers[country].countryCode === countryCode) {
            for (const network in mobileCarriers[country].networks) {
                const prefixes = mobileCarriers[country].networks[network].prefixes;
                const prefixFound = prefixes.find(prefix => phoneNumber.startsWith(prefix));
                if (prefixFound) {
                    return network;
                }
            }
        }
    }
    return "Network not found";
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
    const networks = mobileCarriers[country]?.networks;
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
    getCountriesWithNetwork
};
