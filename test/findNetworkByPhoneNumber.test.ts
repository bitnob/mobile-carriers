import { findNetworkByPhoneNumber } from "../src/index";

describe("findNetworkByPhoneNumber", () => {
  test("should find the network by phone number and country code", () => {
    expect(findNetworkByPhoneNumber("08060000001", "+234")).toBe("MTN");
    expect(findNetworkByPhoneNumber("0711000000", "+254")).toBe("Safaricom");
  });

  test('should return "Network not found" for an unknown network', () => {
    expect(findNetworkByPhoneNumber("9876543210", "+1")).toBe(
      "Network not found"
    );
  });
});
