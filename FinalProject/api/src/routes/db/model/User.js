const crypto = require("crypto");

module.exports = class {
  user_id = null;
  username = null;
  #hashedPassword = null;
  #salt = null;

  constructor(data) {
    this.user_id = data.user_id;
    this.username = data.username;
    this.#hashedPassword = data.password;
    this.#salt = data.salt;
  }

  validatePassword(password) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        this.#salt,
        100000,
        64,
        "sha512",
        (err, derivedKey) => {
          if (err) {
            //problem computing digest, like hash function not available
            reject("Error: " + err);
          }

          const digest = derivedKey.toString("hex");
          if (this.#hashedPassword == digest) {
            resolve(this);
          } else {
            reject("Invalid username or password");
          }
        }
      );
    });
  }

  toJSON() {
    return {
      id: this.user_id,
      username: this.username,
    };
  }
};
