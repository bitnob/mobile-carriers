import { phoneNumberLookup } from "../src/index";

describe("phoneNumberLookup", () => {
  it("should return correct carrier info for a valid phone number", () => {
    const result = phoneNumberLookup("+2348060000001");
    expect(result).toEqual({
      phoneNumber: "+2348060000001",
      countryCode: "+234",
      localPhoneNumber: "08060000001",
      network: "MTN",
      mobileMoney: true,
      isValid: true,
    });
  });

  it('should return null for an invalid phone number', () => {
    const result = phoneNumberLookup("12345");
    expect(result).toBe(null);
  });
});
