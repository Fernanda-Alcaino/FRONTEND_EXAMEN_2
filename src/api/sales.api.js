import api from "../services/api.js";

export const registerSale = async (sale) => {
  const response = await api.post("/ventas", sale);
  return response.data;
};

export const getSales = async () => {
  const response = await api.get("/ventas");
  return response.data;
};
