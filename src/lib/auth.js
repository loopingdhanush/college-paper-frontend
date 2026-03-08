import api from "./api";

export const checkAuth = async () => {
  try {
    await api.get("/papers/test");
    return true;
  } catch {
    return false;
  }
};

export const checkAdmin = async () => {
  try {
    await api.get("/papers/admin-test");
    return true;
  } catch {
    return false;
  }
};