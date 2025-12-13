import React, { createContext, useContext, useState } from "react";

const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);

  const registerSale = ({ items, total, paymentMethod, email }) => {
    const newSale = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items,
      total,
      paymentMethod,
      email,
    };

    setSales((prev) => [...prev, newSale]);
  };

  return (
    <SalesContext.Provider value={{ sales, registerSale }}>
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error("useSales debe usarse dentro de SalesProvider");
  }
  return context;
};
