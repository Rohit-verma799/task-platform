import API from "./api";

export const createTask = (data) => API.post("/task/createtask", data);

export const getAllTasks = () => API.get("/task/gettask");

export const getTaskById = (id) => API.get(`/task/getTaskById/${id}`);

export const runTask = (id) => API.post(`/task/${id}/run`);
