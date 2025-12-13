import React, { createContext, useContext, useState, useEffect } from "react";
import { getSales, registerSale } from "../api/sales.api.js";

const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const data = await getSales();
      setSales(data);
    } catch (error) {
      console.error("Error cargando ventas", error);
    }
  };

  const addSale = async (sale) => {
    const savedSale = await registerSale(sale);
    setSales((prev) => [...prev, savedSale]);
  };

  return (
    <SalesContext.Provider value={{ sales, addSale }}>
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => useContext(SalesContext);
