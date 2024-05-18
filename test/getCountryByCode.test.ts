import { getCountryByCode } from "../src/index";

describe("getCountryByCode", () => {
  test("should return the correct country info", () => {
    const country = getCountryByCode("+234");
    expect(country).toEqual({
      countryCode: "+234",
      isoCode: "NG",
      regex: "^(?:\\+234)(0?)(70[1-9]|80[2-9]|81[0-8]|90[2-9])\\d{7}$",
      networks: {
        MTN: {
          prefixes: [
            "0803",
            "0806",
            "0703",
            "0706",
            "0810",
            "0813",
            "0814",
            "0816",
            "0903",
            "0906",
          ],
          mobileMoney: true,
        },
        Glo: {
          prefixes: ["0805", "0807", "0811", "0815", "0705", "0905"],
          mobileMoney: false,
        },
        Airtel: {
          prefixes: ["0802", "0808", "0708", "0812", "0701", "0902", "0907"],
          mobileMoney: true,
        },
        "9Mobile": {
          prefixes: ["0809", "0817", "0818", "0909"],
          mobileMoney: true,
        },
      },
    });
  });

  test("should return null for an unknown country code", () => {
    const country = getCountryByCode("+999");
    expect(country).toBeNull();
  });
});
