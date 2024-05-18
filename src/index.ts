import mobileCarriers from './carriers.json';

interface Carrier {
    countryCode: string;
    networks: {
        [networkName: string]: {
            prefixes: string[];
            'mobileMoney'?: boolean;
        };
    };
    regex?: string;
}

const mobileCarriersData: { [country: string]: Carrier } = mobileCarriers;

function findNetworkByPhoneNumber(phoneNumber: string, countryCode: string): string {
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

function extractCountryCode(phoneNumber: string): string | null {
    const phonePrefixRegex = /^\+?(\d{1,3})/;
    const match = phoneNumber.match(phonePrefixRegex);
    return match ? (match[0].startsWith('+') ? match[0] : `+${match[1]}`) : null;
}

function localizedPhoneNumber(phoneNumber: string): string {
    const countryCodeRegex = /^\+\d{1,3}/;
    const localPhoneNumber = phoneNumber.replace(countryCodeRegex, '');
    return localPhoneNumber.startsWith('0') ? localPhoneNumber : '0' + localPhoneNumber;
}

interface PhoneNumberLookupResponse {
    phoneNumber: string;
    countryCode: string | null;
    localPhoneNumber: string;
    network: string;
    mobileMoney: boolean | null;
    isValid: boolean;
}

function phoneNumberLookup(phoneNumber: string): PhoneNumberLookupResponse | string {
    const countryCode = extractCountryCode(phoneNumber);
    if (!countryCode) return "Invalid number format";

    const localPhoneNumber = localizedPhoneNumber(phoneNumber);
    const network = findNetworkByPhoneNumber(localPhoneNumber, countryCode);
    const mobileMoney = hasMobileMoney(countryCode, network);
    const isValid = validatePhoneNumber(phoneNumber);

    const response: PhoneNumberLookupResponse = {
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

function hasMobileMoney(countryCode: string, networkName: string): boolean | null {
    const country = getCountryByCode(countryCode);
    if (!country) return null;

    const normalizedNetworkName = networkName.toLowerCase();
    for (const telco in country.networks) {
        if (telco.toLowerCase() === normalizedNetworkName) {
            return country.networks[telco]['mobileMoney'] || false;
        }
    }

    return null;
}

function validatePhoneNumber(phoneNumber: string): boolean {
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

function getCountryByCode(countryCode: string): Carrier | null {
    for (const country in mobileCarriersData) {
        if (mobileCarriersData[country].countryCode === countryCode) {
            return mobileCarriersData[country];
        }
    }
    return null;
}

function getTelcosByCountry(countryCode: string): Carrier | null {
    return getCountryByCode(countryCode);
}

function getTelcoByPhoneNumber(phoneNumber: string): string | null {
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

function getNetworkPrefixes(networkName: string): string[] | string {
    const capitalizedNetworkName = networkName.charAt(0).toUpperCase() + networkName.slice(1).toLowerCase();
    const prefixes: string[] = [];
    for (const country in mobileCarriersData) {
        for (const network in mobileCarriersData[country].networks) {
            if (network.toLowerCase() === capitalizedNetworkName.toLowerCase()) {
                prefixes.push(...mobileCarriersData[country].networks[network].prefixes);
            }
        }
    }
    return prefixes.length ? prefixes : "No prefixes found for this network";
}

function getMobileMoneyNetworks(country: string): string[] {
    const capitalizedCountryName = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
    const networks = mobileCarriersData[capitalizedCountryName]?.networks;
    return networks ? Object.keys(networks).filter(network => networks[network]['mobileMoney']) : [];
}

function getCountriesWithNetwork(networkName: string): string[] {
    const countries: string[] = [];
    for (const country in mobileCarriersData) {
        const networks = mobileCarriersData[country].networks;
        if (networks.hasOwnProperty(networkName)) {
            countries.push(country);
        }
    }
    return countries;
}

export {
    findNetworkByPhoneNumber,
    getNetworkPrefixes,
    getMobileMoneyNetworks,
    getCountriesWithNetwork,
    phoneNumberLookup,
    validatePhoneNumber,
    getTelcoByPhoneNumber,
    getTelcosByCountry
};
