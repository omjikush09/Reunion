import chai, { expect } from "chai";
import  chatHttp from "chai-http"



import server from "../index"
chai.use(chatHttp);

let token:string;

describe("User API test",()=>{

    it("Create User",(done:any)=>{
        chai.request(server).post("/api/").send({
            "email":"omjikush09@gmail.com",
            "password":"232343"
        }).end((err,response)=>{
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.all.keys("status","jwt_token")
            done();
        })
    })

    it("Login User",(done:any)=>{
        chai.request(server).post("/api/").send({
            "email":"omjikush09@gmail.com",
            "password":"232343"
        }).end((err,response)=>{
            token=response.body.jwt_token;
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.all.keys("status","jwt_token")
            done();
        })
    })

})


describe("Post API test",()=>{

    it("Create Post",(done:any)=>{
        chai.request(server).post("/api/posts")
        .set({ "Authorization": `Bearer ${token}` }).send({
            "title":"Testing ",
            "desc":"This is tesing post description"
        }).end((err,response)=>{
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.all.keys("status","data")
            done();
        })
    })

  
})


