const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("when there is initially one user saved", () => {
  beforeEach(async () => {

    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("password", 10);
    await new User({ username: "user", name:"newname", passwordHash }).save();
  });

  test("user is returned", async () => {
    const usersAtStart = await helper.usersInDb();

    expect(usersAtStart[0].username).toBe("user");
  });

  test("creating a new user succeeds", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = helper.newUser
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails if username is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    // eslint-disable-next-line no-unused-vars
    const { username, ...newUser } = helper.newUser

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails if password is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    const { password, ...newUser } = helper.newUser

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails if username is shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const { username, ...newUser } = helper.newUser
    newUser.username = "12"

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails if password is shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const { password, ...newUser } = helper.newUser
    newUser.password = "12"

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});