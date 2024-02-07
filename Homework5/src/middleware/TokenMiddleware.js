require("dotenv").config();
const base64 = require("base64url");
const crypto = require("crypto");
const TOKEN_COOKIE_NAME = "UserAuth";
const API_SECRET = process.env.API_SECRET;

exports.validateToken = (req, res, next) => {
  let token = null;
  if (!req.cookies[TOKEN_COOKIE_NAME]) {
    const authHeader = req.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  } else {
    token = req.cookies[TOKEN_COOKIE_NAME];
  }

  if (!token) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const tokenPieces = token.split(".");
    let encodedHeader = tokenPieces[0];
    let encodedPayload = tokenPieces[1];
    let signature = tokenPieces[2];

    let header = base64.decode(encodedHeader);
    let payload = base64.decode(encodedPayload);
    let tokenInfo = "" + encodedHeader + "." + encodedPayload;

    let computedSignature = crypto
      .createHmac("sha256", API_SECRET)
      .update(tokenInfo)
      .digest("base64url");

    if (computedSignature != signature) {
      throw new error();
    }

    payload = JSON.parse(payload);

    let currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp <= currentTime) {
      throw new error();
    }

    req.user = payload.user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
};

exports.generateToken = (req, res, user) => {
  const tokenUser = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    avatar: user.avatar,
  };

  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    user: tokenUser,
    exp: Math.floor(Date.now() / 1000) + 30,
  };

  let tokenInfo =
    "" +
    base64.encode(JSON.stringify(header)) +
    "." +
    base64.encode(JSON.stringify(payload));

  let signature = crypto
    .createHmac("sha256", API_SECRET)
    .update(tokenInfo)
    .digest("base64url");

  let token = tokenInfo + "." + signature;
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 60 * 1000,
  });
};

exports.removeToken = (req, res) => {
  res.cookie(TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    maxAge: -1000,
  });
};
