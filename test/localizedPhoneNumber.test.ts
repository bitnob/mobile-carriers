import { localizedPhoneNumber } from "../src/index";

describe("localizedPhoneNumber", () => {
  test("should return the localized phone number", () => {
    expect(localizedPhoneNumber("+2348060000001")).toBe("08060000001");
    expect(localizedPhoneNumber("+254711000000")).toBe("0711000000");
  });

  test("should add leading zero if missing", () => {
    expect(localizedPhoneNumber("+2348060000001")).toBe("08060000001");
    expect(localizedPhoneNumber("+254711000000")).toBe("0711000000");
  });
});
