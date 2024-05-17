
# Mobile Carrier Finder Package

This package provides utilities to find mobile network carriers based on phone numbers and to retrieve information about mobile networks across various countries.

## Installation

First, you need to install the package in your Node.js project:

```bash
npm install mobile-carriers
```

## Usage

### Importing the Package

Before you can use the functions, import them into your project file:

```javascript
const {
  findNetworkByPhoneNumber,
  getNetworkPrefixes,
  getMobileMoneyNetworks,
  getCountriesWithNetwork,
  phoneNumberLookup,
  validatePhoneNumber,
  getTelcoByPhoneNumber,
  getTelcos
} = require('mobile-carriers');
```

### Functions

#### 1. Find Network by Phone Number

This function takes a phone number and optionally a country code. It returns the network the phone number belongs to.

**Example:**

```javascript
console.log(findNetworkByPhoneNumber('08031234567', '+234'));
// Output: 'MTN'
```

If you do not know the country code, the function tries to infer it from the phone number:

**Example:**

```javascript
console.log(findNetworkByPhoneNumber('+2348031234567'));
// Output: 'MTN'
```

#### 2. Get Network Prefixes

This function takes a network name, capitalizes it, and returns all prefixes associated with that network in all countries.

**Example:**

```javascript
console.log(getNetworkPrefixes('mtn'));
// Output: ['0803', '0806', '0703', ...]
```

#### 3. Get Mobile Money Networks

Retrieve a list of all networks offering mobile money services in a specified country.

**Example:**

```javascript
console.log(getMobileMoneyNetworks('Ghana'));
// Output: ['MTN', 'Vodafone', 'AirtelTigo']
```

#### 4. Get Countries with Network

Provides a list of countries where a specific network is operational.

**Example:**

```javascript
console.log(getCountriesWithNetwork('MTN'));
// Output: ['Nigeria', 'Ghana', 'Ivory Coast', ...]
```

#### 5. Phone Number Lookup

This function takes a phone number and returns detailed information about it, including the country code, local phone number, network, and mobile money capability.

**Example:**

```javascript
console.log(phoneNumberLookup('+2330549115756'));
// Output: {
//   "phoneNumber": "+2330549115756",
//   "countryCode": "+233",
//   "localPhoneNumber": "0549115756",
//   "network": "MTN",
//   "mobileMoney": true,
//   "isValid": true
// }
```

#### 6. Validate Phone Number

This function validates a phone number using the country's regex pattern.

**Example:**

```javascript
console.log(validatePhoneNumber('+2330549115756'));
// Output: true
```

#### 7. Get Telco by Phone Number

This function retrieves the telco information based on the phone number.

**Example:**

```javascript
console.log(getTelcoByPhoneNumber('+2330549115756'));
// Output: 'MTN'
```

#### 8. Get Telcos in a Country

This function retrieves all telcos in a specified country using the country code.

**Example:**

```javascript
console.log(getTelcos('+233'));
// Output: {
//   countryCode: '+233',
//   isoCode: 'GH',
//   networks: { ... }
// }
```

## How to Contribute to the Mobile-carriers Repository

This repository serves as a comprehensive database of mobile carrier prefixes from various countries. We welcome contributions, especially those that help expand our coverage or correct existing information. Here's how you can help:

### Contribution Guidelines

#### 1. Formatting Your Contribution

When adding new carriers or prefixes, please adhere to the following JSON structure for consistency and ease of integration:

```json
{
  "Country Name": {
    "countryCode": "+<country_code>",
    "isoCode": "<iso_code>",
    "regex": "<regex_pattern>",
    "networks": {
      "Carrier Name": {
        "prefixes": ["Prefix1", "Prefix2", ...],
        "mobileMoney": true
      },
      "Another Carrier": {
        "prefixes": ["Prefix1"],
        "mobileMoney": false
      }
    }
  }
}
```

#### Example:

```json
{
  "Ghana": {
    "countryCode": "+233",
    "isoCode": "GH",
    "regex": "^(?:\+233)(0?)(20|23|24|26|27|28|50|54|55|56|57|58|59)\d{7}$",
    "networks": {
      "MTN": {
        "prefixes": ["024", "054", "055", "059"],
        "mobileMoney": true
      },
      "Vodafone": {
        "prefixes": ["020"],
        "mobileMoney": true
      },
      "AirtelTigo": {
        "prefixes": ["026", "027", "056", "057"],
        "mobileMoney": true
      }
    }
  }
}
```

Ensure each mobile network prefix you add is validated and accurate. For instance, if the international dialing code for Ghana is +233, then +233549115753 or +2330549115753  should be a valid phone number.

#### 2. Submitting Your Contribution

After adding the country and network prefixes:

- **Create a Pull Request (PR):** Include your changes in a PR for review.
- **Validation:** Ensure you validate each number prefix added.
- **JSON Linting:** Use a JSON linter to check the syntax of your updates.
- **References:** Provide sources or references you used to verify the prefixes. This could be official carrier websites or telecommunications regulatory publications.

## Support

For any issues or further questions, please open an issue on the GitHub repository.
