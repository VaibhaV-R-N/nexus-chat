'use client'
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { grey,blue,yellow, red, deepOrange } from "@mui/material/colors";
import { useSelector } from "react-redux";

export default function MuiThemeProvider({children}) {
    const Mode = useSelector(state=>state.theme)
    const darkTheme = createTheme({
        palette:{
          primary:{
            main:"#000000"
          },
          secondary:{
            main:grey[50]
          },
          success:{
            main:yellow[500]
          }
          
        }
      })
    const darkTheme2 = createTheme({
      palette:{
        primary:{
          main:"#212121"
        },
        secondary:{
          main:grey[50]
        },
        success:{
          main:yellow[500]
        }
        
      }
    })

      const LightTheme = createTheme({
        palette:{
          primary:{
            main:grey[50]
          },
          secondary:{
            main:grey[900]
          },
          success:{
            main:blue[900]
          }
          
        }
      })

      const LightTheme2 = createTheme({
        palette:{
          primary:{
            main:"#ffe082"
          },
          secondary:{
            main:"#212121"
          },
          success:{
            main:"#e91e63"
          }
          
        }
      })

    const themeArray = [darkTheme,LightTheme,darkTheme2,LightTheme2]
  return (
    <ThemeProvider theme={themeArray[Mode]}>
        {children}
    </ThemeProvider>
  )
}
