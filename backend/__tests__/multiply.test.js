const { multiply } = require("../app");

test("multiply and returns",()=>{
    expect(multiply(5,4)).toBe(20)
})