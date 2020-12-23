require("chai").should();

const base_sdk = require("./base_sdk_test");

base_sdk.create_test("lead", { name: "abcd", mobile: { mobile: "1000200010", mobile_code: "91" }, email: "1000200010@test.com", country: "ind" });