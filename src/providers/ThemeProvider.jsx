import { useEffect } from "react";

export default function ThemeProvider({children}){

  useEffect(()=>{
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme){
      document.documentElement.dataset.theme = savedTheme;
    }
    else{
      document.documentElement.dataset.theme="default";
      localStorage.setItem(
        "theme",
        "default"
      );
    }
  },[]);
  return children;
}