import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const SearchContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch debe usarse dentro de SearchProvider");
  }
  return context;
};

// Provider que envuelve la aplicación
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const value = {
    searchTerm,
    setSearchTerm,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};