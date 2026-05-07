import API from "./api";

export const signup = (data) => API.post("/user/Signup", data);

export const login = (data) => API.post("/user/Login", data);

export const logout = () => API.post("/user/Logout");
