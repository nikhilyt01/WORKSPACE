import { createContext,useContext } from "react";

export  const ThemeContext = createContext({               // context can have default value and have state as anything
    thememode:"light",
    darktheme: ()=>{},
    lighttheme:()=>{}

});

export const ThemeProvider = ThemeContext.Provider

export default function useTheme (){
    return useContext(ThemeContext)
}