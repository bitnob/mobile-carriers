import mobileCarriers from "./carriers.json";

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
  const countryCodes = [
    "+1",
    "+20",
    "+211",
    "+212",
    "+213",
    "+216",
    "+218",
    "+220",
    "+221",
    "+222",
    "+223",
    "+224",
    "+225",
    "+226",
    "+227",
    "+228",
    "+229",
    "+230",
    "+231",
    "+232",
    "+233",
    "+234",
    "+235",
    "+236",
    "+237",
    "+238",
    "+239",
    "+240",
    "+241",
    "+242",
    "+243",
    "+244",
    "+245",
    "+246",
    "+247",
    "+248",
    "+249",
    "+250",
    "+251",
    "+252",
    "+253",
    "+254",
    "+255",
    "+256",
    "+257",
    "+258",
    "+260",
    "+261",
    "+262",
    "+263",
    "+264",
    "+265",
    "+266",
    "+267",
    "+268",
    "+269",
    "+27",
    "+290",
    "+291",
    "+297",
    "+298",
    "+299",
    "+30",
    "+31",
    "+32",
    "+33",
    "+34",
    "+350",
    "+351",
    "+352",
    "+353",
    "+354",
    "+355",
    "+356",
    "+357",
    "+358",
    "+359",
    "+36",
    "+370",
    "+371",
    "+372",
    "+373",
    "+374",
    "+375",
    "+376",
    "+377",
    "+378",
    "+379",
    "+380",
    "+381",
    "+382",
    "+383",
    "+385",
    "+386",
    "+387",
    "+389",
    "+39",
    "+40",
    "+41",
    "+420",
    "+421",
    "+423",
    "+43",
    "+44",
    "+45",
    "+46",
    "+47",
    "+48",
    "+49",
    "+500",
    "+501",
    "+502",
    "+503",
    "+504",
    "+505",
    "+506",
    "+507",
    "+508",
    "+509",
    "+51",
    "+52",
    "+53",
    "+54",
    "+55",
    "+56",
    "+57",
    "+58",
    "+590",
    "+591",
    "+592",
    "+593",
    "+594",
    "+595",
    "+596",
    "+597",
    "+598",
    "+599",
    "+60",
    "+61",
    "+62",
    "+63",
    "+64",
    "+65",
    "+66",
    "+670",
    "+672",
    "+673",
    "+674",
    "+675",
    "+676",
    "+677",
    "+678",
    "+679",
    "+680",
    "+681",
    "+682",
    "+683",
    "+685",
    "+686",
    "+687",
    "+688",
    "+689",
    "+690",
    "+691",
    "+692",
    "+7",
    "+81",
    "+82",
    "+84",
    "+850",
    "+852",
    "+853",
    "+855",
    "+856",
    "+86",
    "+880",
    "+886",
    "+90",
    "+91",
    "+92",
    "+93",
    "+94",
    "+95",
    "+960",
    "+961",
    "+962",
    "+963",
    "+964",
    "+965",
    "+966",
    "+967",
    "+968",
    "+970",
    "+971",
    "+972",
    "+973",
    "+974",
    "+975",
    "+976",
    "+977",
    "+98",
    "+992",
    "+993",
    "+994",
    "+995",
    "+996",
    "+998",
  ];

  for (const code of countryCodes) {
    if (phoneNumber.startsWith(code)){
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
