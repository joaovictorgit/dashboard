import request from "supertest";

describe("request Admin", () => {
  const url = "http://localhost:3000/api";

  describe("when API call is successful", () => {
    it("should be login admin", async () => {
      const response = await request(`${url}`)
        .post("/admin/login")
        .send({ email: "admin@gmail.com", password: "12345" });
      expect(response.body).toBeTruthy();
      expect(response.status).toBe(200);
    });

    it("should return users list", async () => {
      const response = await request(`${url}`).get("/admin/users");
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
    });
  });

  describe("when API call is not successful", () => {
    it("not should be return user for id", async () => {
      const response = await request(`${url}`).get(`/admin/user/2`);
      expect(response.status).toBe(400);
      expect(response.body.length).not.toBeTruthy();
    });
  });
});
