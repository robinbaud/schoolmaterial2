const getstudent = require("./getStudent");

test("has to be array", () => {
  let query = getstudent();
  console.log(query);
  expect(getstudent()).toBe(1);
});
