import { getTelcosByCountry } from "../src/index";

describe("getTelcosByCountry", () => {
  test("should return all telcos for a given country code", () => {
    expect(getTelcosByCountry("+234")).toEqual([
      "MTN",
      "Glo",
      "Airtel",
      "9Mobile",
    ]);
    expect(getTelcosByCountry("+254")).toEqual(["Safaricom", "Airtel"]);
  });

  test("should return null for an invalid country code", () => {
    expect(getTelcosByCountry("+999")).toBeNull();
  });

  test("should return null for a country code not in the carriers.json", () => {
    expect(getTelcosByCountry("+1")).toBeNull(); // Assuming +1 is not in carriers.json
  });
});
