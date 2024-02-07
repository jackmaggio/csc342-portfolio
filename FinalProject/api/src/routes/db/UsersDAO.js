let User = require("./model/User");
const db = require("./DBConnection");
const crypto = require("crypto");

function getUsers() {
  return db.query("SELECT * FROM users").then(({ results }) => {
    return results.map((user) => new User(user));
  });
}

function getUser(email) {
  return db
    .query("SELECT * FROM users WHERE users.email = ?", [email])
    .then(({ results }) => {
      if (results[0]) {
        return new User(results[0]);
      }
    });
}

function getUserById(id) {
  return db
    .query("SELECT * FROM users WHERE users.user_id = ?", [id])
    .then(({ results }) => {
      if (results[0]) {
        return new User(results[0]);
      }
    });
}

function checkLoginInfo(params) {
  return db
    .query("SELECT * FROM users WHERE users.email=? AND users.password=?", [
      params.email,
      params.password,
    ])
    .then(({ results }) => {
      console.log("in here");
      console.log(results);
      if (results[0]) {
        return new User(results[0]);
      }
    });
}

function createUser(email, password) {
  // Check if the email already exists
  return db
    .query("SELECT * FROM users WHERE email = ?", [email])
    .then(({ results }) => {
      if (results.length > 0) {
        throw new Error("Email already exists");
      } else {
        // Generate a salt
        let salt = crypto.randomBytes(16).toString("hex");
        console.log("Salt: " + salt);

        // Generate a hash
        let hash = crypto
          .pbkdf2Sync(password, salt, 100000, 64, "sha512")
          .toString("hex");
        console.log("Hash: " + hash);

        console.log("Created user! " + email);
        return db
          .query("INSERT INTO users VALUES (null, ?, ?, ?)", [
            email,
            hash,
            salt,
          ])
          .then(({ results }) => {
            console.log("User created successfully! ", results.insertId);
            return getUserById(results.insertId);
          });
      }
    });
}

function getUserByCredentials(email, password) {
  return db
    .query("SELECT * FROM users WHERE email=?", [email])
    .then(({ results }) => {
      const user = new User(results[0]);
      if (user) {
        // we found our user
        return user.validatePassword(password);
      } else {
        // if no user with provided username
        throw new Error("No such user");
      }
    });
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  getUserById: getUserById,
  checkLoginInfo: checkLoginInfo,
  createUser: createUser,
  getUserByCredentials: getUserByCredentials,
};
