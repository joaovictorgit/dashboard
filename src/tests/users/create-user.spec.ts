import request from "supertest";
import { TUser } from "../../utils/user";
import app from "../../app";

describe("Test Users", () => {
  it("should be add new user", async () => {
    const user: TUser = {
      name: "Pedro",
      email: "pedro@gmail.com",
      password: "12345",
      subscribed: "1000",
      channel: "@pedro",
      category: "vlog",
      photo: "",
    };
    const response = await request(app).post("/users").send({ user });
    console.log(response.body);
    //expect(response.status).toBe(201);
    expect(response.body).not.toBeNull();
  });
});
