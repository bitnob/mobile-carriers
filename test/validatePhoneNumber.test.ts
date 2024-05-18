import { validatePhoneNumber } from "../src/index";

describe("validatePhoneNumber", () => {
  it("should validate a phone number correctly", () => {
    expect(validatePhoneNumber("+2348060000001")).toBe(true);
    expect(validatePhoneNumber("12345")).toBe(false);
  });

  it("should return false for a phone number with an invalid country code", () => {
    expect(validatePhoneNumber("+9991234567890")).toBe(false);
  });

  it("should validate phone numbers with different country codes", () => {
    expect(validatePhoneNumber("+254711123456")).toBe(true); // Kenya
    expect(validatePhoneNumber("+233201234567")).toBe(true); // Ghana
  });

  it("should return false for a malformed phone number", () => {
    expect(validatePhoneNumber("++12345")).toBe(false);
  });
});
