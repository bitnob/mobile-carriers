
# Mobile Carrier Finder Package

This package provides utilities to find mobile network carriers based on phone numbers and to retrieve information about mobile networks across various countries. Below is a guide on how to use the provided functionalities.

## Installation

First, you need to install the package in your node project:

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
  getCountriesWithNetwork
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


## How to Contribute to the Mobile-carriers Repository

This repository serves as a comprehensive database of mobile carrier prefixes from various countries. We welcome contributions, especially those that help expand our coverage or correct existing information. Here's how you can help:

## Contribution Guidelines

### 1. Formatting Your Contribution

When adding new carriers or prefixes, please adhere to the following JSON structure for consistency and ease of integration:

```json
{
  "Country Name": {
    "networks": {
      "Carrier Name": {
        "prefixes": ["Prefix1", "Prefix2", ...],
        "mobile money": true
      },
      "Another Carrier": {
        "prefixes": ["Prefix1"],
        "mobile money": false
      }
    }
  }
}
```

### Example:
```json
{
  "Ghana": {
    "networks": {
      "MTN": {
        "prefixes": ["054", "059"]
      },
      "Vodafone": {
        "prefixes": ["020"]
      }
    }
  }
}
```

Ensure each mobile network prefix you add is validated and accurate. For instance, if the international dialing code for Ghana is +233, then +2330549115753 should be a valid phone number.

### 2. Submitting Your Contribution

After adding the country and network prefixes:

- **Create a Pull Request (PR):** Include your changes in a PR for review.
- **Validation:** Ensure you validate each number prefix added.
- **JSON Linting:** Use a JSON linter to check the syntax of your updates.
- **References:** Provide sources or references you used to verify the prefixes. This could be official carrier websites or telecommunications regulatory publications.



## Support

For any issues or further questions, please open an issue on the GitHub repository 