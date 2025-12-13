import React, { createContext, useContext, useState } from "react";

const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);

  const registerSale = (sale) => {
    setSales((prev) => [...prev, sale]);
  };

  return (
    <SalesContext.Provider value={{ sales, registerSale }}>
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => useContext(SalesContext);
