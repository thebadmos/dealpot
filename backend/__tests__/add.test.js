const { add } = require("../app");

test("it returns the added value",()=>{
    expect(add(2,3)).toBe(5);
})