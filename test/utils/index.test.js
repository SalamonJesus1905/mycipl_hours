import superDB from "../dbConnection"
import app from "../../src/app.js"
import User from "../../src/models/user.model.js"
import supertest from "supertest"
let request = supertest(app)
superDB()
describe('MYCIPLHOURS',()=>{
    const testUsers = {
        email: "mani@gmail.com",
        password: "manil12345" 
    }
    beforeAll( async () =>{
        await superDB()
        await User.deleteMany()
        const newUser = new User({
            email: testUsers.email,
            password:  testUsers.password
        })
        await newUser.save()
    }) 
    
    test("sample test", async () =>{
        expect(1).toBe(1)
    })
    test("POST register api return 200 ", async () =>{
        const res = await request.post('/v1/auth/register')
        .send({email: "macha@gmail.com",password: "macha12345"})
        expect(res.status).toBe(200)
    })
    test("POST register api return 200 ", async () =>{
        const res = await request.post('/v1/auth/register')
        .send({})
        expect(res.status).toBe(500)
    })
    test("POST login api return 200 ", async () =>{
        const res = await request.post('/v1/auth/login')
        .send({email: "mani@gmail.com",password: "manil12345"})
        expect(res.status).toBe(200)
    })
    test("POST login api return 500 ", async () =>{
        const res = await request.post('/v1/auth/login')
        .send({})
        expect(res.status).toBe(500)
    })
    
})
