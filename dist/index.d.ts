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
declare function extractCountryCode(phoneNumber: string): string | null;
declare function localizedPhoneNumber(phoneNumber: string): string;
declare function getCountryByCode(countryCode: string): Carrier | null;
declare function getTelcoByPhoneNumber(phoneNumber: string): string | null;
declare function getTelcosByCountry(countryCode: string): string[] | null;
declare function findNetworkByPhoneNumber(phoneNumber: string, countryCode: string): string;
declare function getNetworkPrefixes(networkName: string): string[] | string;
declare function hasMobileMoney(countryCode: string, networkName: string): boolean | null;
declare function phoneNumberLookup(phoneNumber: string): "Invalid number format" | {
    phoneNumber: string;
    countryCode: string;
    localPhoneNumber: string;
    network: string;
    mobileMoney: boolean | null;
    isValid: boolean;
};
declare function validatePhoneNumber(phoneNumber: string): boolean;
declare function getCountriesWithNetwork(networkName: string): string[];
declare function getMobileMoneyNetworks(countryName: string): string[];
export { extractCountryCode, localizedPhoneNumber, getCountryByCode, getTelcoByPhoneNumber, getTelcosByCountry, findNetworkByPhoneNumber, getNetworkPrefixes, hasMobileMoney, phoneNumberLookup, validatePhoneNumber, getCountriesWithNetwork, getMobileMoneyNetworks, };
