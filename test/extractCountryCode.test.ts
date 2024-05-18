import { extractCountryCode } from "../src/index";

describe("extractCountryCode", () => {
  test("should extract the correct country code", () => {
    const countryCode = extractCountryCode("+2348060000001");
    expect(countryCode).toBe("+234");
  });

  test('should return "Invalid number format" for malformed number', () => {
    const countryCode = extractCountryCode("12345");
    expect(countryCode).toBe("Invalid number format");
  });

  test("should handle phone numbers without a plus sign", () => {
    const countryCode = extractCountryCode("2348060000001");
    expect(countryCode).toBe("+234");
  });

  test("should handle phone numbers with different country codes", () => {
    const countryCodeUS = extractCountryCode("+11234567890");
    expect(countryCodeUS).toBe("+1");

    const countryCodeUK = extractCountryCode("+441234567890");
    expect(countryCodeUK).toBe("+44");

    const countryCodeGhana = extractCountryCode("+233201234567");
    expect(countryCodeGhana).toBe("+233");

    const countryCodeKenya = extractCountryCode("+254711123456");
    expect(countryCodeKenya).toBe("+254");

    const countryCodeSouthAfrica = extractCountryCode("+27821234567");
    expect(countryCodeSouthAfrica).toBe("+27");
  });

  test('should return "Invalid number format" for malformed number', () => {
    const countryCode = extractCountryCode("++12345");
    expect(countryCode).toBe("Invalid number format");
  });
});
