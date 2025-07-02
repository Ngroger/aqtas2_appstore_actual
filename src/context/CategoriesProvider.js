import React, { createContext, useState, useContext } from 'react';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const selectCategoryContext = (category) => {
    console.log("category context: ", category);
    setSelectedCategory(category)
  };

  const selectSubcategoryContext = (subcategory) => {
    console.log("subcategory context: ", subcategory);
    setSelectedSubcategory(subcategory)
  }

  return (
    <CategoriesContext.Provider value={{ selectedCategory, selectedSubcategory, selectCategoryContext, selectSubcategoryContext }}>
      {children}
    </CategoriesContext.Provider>
  )
};

export const useCategories = () => useContext(CategoriesContext);