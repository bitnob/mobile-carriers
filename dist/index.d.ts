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
declare function findNetworkByPhoneNumber(phoneNumber: string, countryCode: string): string;
declare function extractCountryCode(phoneNumber: string): string | null;
declare function localizedPhoneNumber(phoneNumber: string): string;
interface PhoneNumberLookupResponse {
    phoneNumber: string;
    countryCode: string | null;
    localPhoneNumber: string;
    network: string;
    mobileMoney: boolean | null;
    isValid: boolean;
}
declare function phoneNumberLookup(phoneNumber: string): PhoneNumberLookupResponse | string;
declare function hasMobileMoney(countryCode: string, networkName: string): boolean | null;
declare function validatePhoneNumber(phoneNumber: string): boolean;
declare function getCountryByCode(countryCode: string): Carrier | null;
declare function getTelcosByCountry(countryCode: string): Carrier | null;
declare function getTelcoByPhoneNumber(phoneNumber: string): string | null;
declare function getNetworkPrefixes(networkName: string): string[] | string;
declare function getMobileMoneyNetworks(country: string): string[];
declare function getCountriesWithNetwork(networkName: string): string[];
export { findNetworkByPhoneNumber, extractCountryCode, localizedPhoneNumber, phoneNumberLookup, hasMobileMoney, validatePhoneNumber, getCountryByCode, getTelcosByCountry, getTelcoByPhoneNumber, getNetworkPrefixes, getMobileMoneyNetworks, getCountriesWithNetwork };
