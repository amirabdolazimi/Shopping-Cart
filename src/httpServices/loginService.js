import http from "./httpServices";

const loginUser = (user) => {
  return http.post("/user/login", user);
};

export default loginUser;
