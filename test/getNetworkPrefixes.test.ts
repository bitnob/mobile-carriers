import { getNetworkPrefixes } from "../src/index";

describe("getNetworkPrefixes", () => {
  test("should return the correct prefixes for a network", () => {
    const prefixesMTN = getNetworkPrefixes("Safaricom");
    expect(prefixesMTN).toEqual(["0701", "0711", "0722", "0723"]);

    const prefixesSafaricom = getNetworkPrefixes("Safaricom");
    expect(prefixesSafaricom).toEqual(["0701", "0711", "0722", "0723"]);
  });

  test('should return "No prefixes found for this network" for an unknown network', () => {
    const prefixes = getNetworkPrefixes("UnknownNetwork");
    expect(prefixes).toBe("No prefixes found for this network");
  });
});
