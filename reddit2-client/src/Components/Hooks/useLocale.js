import { useState } from "react";
import { LOCALES } from "../Translate/locales";

export const useLocale = () => {
  const getInitialLocale = () => {
    const savedLocale = localStorage.getItem('locale');
    return savedLocale || LOCALES.ENGLISH
  };
  const [currentLocale, setCurrentLocale] = useState(getInitialLocale());
  const handleChange = ({ target: { value } }) => {
    setCurrentLocale(value);
    localStorage.setItem('locale', value)
  } 
  return [currentLocale, handleChange]
}
