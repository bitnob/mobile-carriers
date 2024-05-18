import { getTelcoByPhoneNumber } from "../src/index";

describe("getTelcoByPhoneNumber", () => {
  test("should return the correct telco for a given phone number", () => {
    expect(getTelcoByPhoneNumber("+2348060000001")).toBe("MTN");
    expect(getTelcoByPhoneNumber("+254711000000")).toBe("Safaricom");
  });

  test("should return null for an invalid phone number", () => {
    expect(getTelcoByPhoneNumber("12345")).toBeNull();
  });

  test("should return null if the country code is not in the carriers.json", () => {
    expect(getTelcoByPhoneNumber("+9991234567890")).toBeNull();
  });

  test("should handle phone numbers with varying lengths correctly", () => {
    expect(getTelcoByPhoneNumber("+11234567890")).toBeNull(); // Not in carriers.json
    expect(getTelcoByPhoneNumber("+441234567890")).toBeNull(); // Not in carriers.json
  });
});
