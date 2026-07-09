import { createContext, useContext, useEffect, useState } from "react";


const ThemeContext = createContext();


const themes = [
  "default",
  "dark",
  "purple",
  "black",
  "orange",
  "red",
  "green",
  "blue",
  "cyan",
];


export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState(() => {

    return localStorage.getItem("app-theme") || "default";

  });


  useEffect(() => {

    const html = document.documentElement;


    html.classList.remove(
      ...themes
    );


    html.classList.add(
      theme
    );


    localStorage.setItem(
      "app-theme",
      theme
    );


  }, [theme]);


  return (

    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themes
      }}
    >

      {children}

    </ThemeContext.Provider>

  );

}



export function useAppTheme(){

  return useContext(ThemeContext);

}