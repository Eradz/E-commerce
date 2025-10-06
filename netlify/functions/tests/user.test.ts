import { expect } from "chai"; 
import request from "supertest";
import { app } from "../api";


describe("User Auth", async()=>{
    it("should not have google ID", async()=>{
        const res = await request(app)
        .post("/api/v1/auth")
        .send({
            username: "",
            password: "",
        });
        expect(res.status).to.equal(400)
        expect(res.body.message).to.equal("This shit doesn't work")
    })
})
