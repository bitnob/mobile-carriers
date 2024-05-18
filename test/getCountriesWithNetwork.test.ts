import { getCountriesWithNetwork } from "../src/index";

describe("getCountriesWithNetwork", () => {
  test("should return all countries where a network is present", () => {
    const countries = getCountriesWithNetwork("MTN");
    const expectedCountries = [
      "Nigeria",
      "Ghana",
      "Ivory Coast",
      "South Africa",
    ];

    expectedCountries.forEach((country) => {
      expect(countries).toContain(country);
    });
  });

  test("should return an empty array for a network not present in any country", () => {
    const countries = getCountriesWithNetwork("UnknownNetwork");
    expect(countries).toEqual([]);
  });
});
