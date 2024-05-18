import {
  phoneNumberLookup,
  validatePhoneNumber,
  findNetworkByPhoneNumber,
  getTelcoByPhoneNumber,
} from "../src/index";

describe("phoneNumberLookup", () => {
  it("should return correct carrier info for a valid phone number", () => {
    const result = phoneNumberLookup("+1234567890");
    expect(result).toEqual({
      phoneNumber: "+1234567890",
      countryCode: "+1",
      localPhoneNumber: "234567890",
      network: "SomeNetwork",
      mobileMoney: true,
      isValid: true,
    });
  });

  it('should return "Invalid number format" for an invalid phone number', () => {
    const result = phoneNumberLookup("12345");
    expect(result).toBe("Invalid number format");
  });
});

describe("validatePhoneNumber", () => {
  it("should validate a phone number correctly", () => {
    expect(validatePhoneNumber("+1234567890")).toBe(true);
    expect(validatePhoneNumber("12345")).toBe(false);
  });
});

describe("findNetworkByPhoneNumber", () => {
  it("should find the network by phone number and country code", () => {
    expect(findNetworkByPhoneNumber("234567890", "+1")).toBe("SomeNetwork");
  });

  it('should return "Network not found" for an unknown network', () => {
    expect(findNetworkByPhoneNumber("9876543210", "+1")).toBe(
      "Network not found"
    );
  });
});

describe("getTelcoByPhoneNumber", () => {
  it("should return the correct telco for a given phone number", () => {
    expect(getTelcoByPhoneNumber("+1234567890")).toBe("SomeTelco");
  });

  it("should return null for an invalid phone number", () => {
    expect(getTelcoByPhoneNumber("12345")).toBeNull();
  });
});
