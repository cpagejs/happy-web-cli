import Cookie from "js-cookie";

const TOKEN_KEY = "aus_h5_token";

function getToken() {
  return Cookie.get(TOKEN_KEY);
}

export { getToken, TOKEN_KEY };
