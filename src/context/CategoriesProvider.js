import React, { createContext, useState, useContext } from 'react';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const selectCategoryContext = (category) => {
    console.log("category context: ", category);
    setSelectedCategory(category)
  }

  return (
    <CategoriesContext.Provider value={{ selectedCategory, selectCategoryContext }}>
      {children}
    </CategoriesContext.Provider>
  )
};

export const useCategories = () => useContext(CategoriesContext);