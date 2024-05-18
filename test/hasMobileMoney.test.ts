import { hasMobileMoney } from "../src/index";

describe("hasMobileMoney", () => {
  test("should return true if the network offers mobile money", () => {
    expect(hasMobileMoney("+234", "MTN")).toBe(true);
    expect(hasMobileMoney("+254", "Safaricom")).toBe(true);
  });

  test("should return false if the network does not offer mobile money", () => {
    expect(hasMobileMoney("+234", "Glo")).toBe(false);
    expect(hasMobileMoney("+27", "Cell C")).toBe(false);
  });

  test("should return null if the country code or network is invalid", () => {
    expect(hasMobileMoney("+999", "MTN")).toBeNull();
    expect(hasMobileMoney("+234", "UnknownNetwork")).toBeNull();
  });
});
