import Cookies from "universal-cookie";

const cookie = new Cookies();

const setCookie = (
  name,
  value,
  options = {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  }
) => {
  cookie.set(name, value, { ...options });
};

const getCookie = (name) => {
  return cookie.get(name);
};

const delCookie = (name) => {
  cookie.remove(name);
};

export { getCookie, setCookie, delCookie };
