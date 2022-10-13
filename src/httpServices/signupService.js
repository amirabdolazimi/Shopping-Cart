import http from "./httpServices";

const signupService = (user) => {
  return http.post("/user/register", user);
};

export default signupService;
