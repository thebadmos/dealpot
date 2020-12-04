process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../models");


// beforeAll(async()=>{
//     await db.query("CREATE TABLE students (id SERIAL PRIMARY KEY, name TEXT)");
// });
beforeEach(async ()=>{
    await User.create([{username:"Maggi",password:"mag"},{username:"Lighter",password:"light"}]);
});
afterEach(async ()=>{
    await User.remove();
});
afterAll(async ()=>{
    await mongoose.disconnect();
});


describe("Signup /",()=>{
    test("It should respond with the new created user",async()=>{
        const response = await request(app).post("/signup").send({username:"Jake",password:"creator"});
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({username:"Jake",password:"creator"});
        const responseFind = await User.find();
        expect(responseFind.length).toBe(3);
    })
    test("It should throw an error if user already exist",async()=>{
        const response = await request(app).post("/signup").send({username:"Maggi",password:"mag"})
        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({message:"Username taken"})
        const responseFind = await User.find();
        expect(responseFind.length).toBe(2);
    })
});

// describe("Search for products function",()=>{
//     test("It should respond with an array of products",async ()=>{
//         const response = await search("headphone");
//         expect(response.length).toBeTruthy();
//     });
// });