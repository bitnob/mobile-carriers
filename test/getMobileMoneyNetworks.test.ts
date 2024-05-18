import { getMobileMoneyNetworks } from "../src/index";

describe("getMobileMoneyNetworks", () => {
  test("should return networks offering mobile money in a country", () => {
    const networksInNigeria = getMobileMoneyNetworks("Nigeria");
    expect(networksInNigeria).toEqual(["MTN", "Airtel", "9Mobile"]);

    const networksInGhana = getMobileMoneyNetworks("Ghana");
    expect(networksInGhana).toEqual(["MTN", "Vodafone", "AirtelTigo"]);

    const networksInBenin = getMobileMoneyNetworks("Benin");
    expect(networksInBenin).toEqual(["MTN", "Moov"]);
  });

  test("should return an empty array for a country with no mobile money networks", () => {
    const networks = getMobileMoneyNetworks("UnknownCountry");
    expect(networks).toEqual([]);
  });
});
