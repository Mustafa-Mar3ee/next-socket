import { BoardProvider } from "@/contexts/boardContext";
import PreferanceContext, { PreferanceProvider } from "@/contexts/preferancesContext";
import { WebSocketContext, socket } from "@/contexts/webSocketContext";
import "@/styles/globals.css";
import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',

      common: {
        white: '#14181e',
        black: "#fff"
      },
      background: {
        paper: "#14181e"
      }

    },

    components: {
      MuiSlider: {
        styleOverrides: {
          root: {
            '& .MuiSlider-thumb': {
              backgroundImage: "linear-gradient(45deg, #e53b77, #e66451)",
              boxShadow: 'none',
              color: "#e66451"
            },
            '& .MuiSlider-track': {
              backgroundImage: "linear-gradient(45deg, #e53b77, #e66451)",
              boxShadow: 'none',
              color: "#e66451"
            },
            '& .MuiSlider-rail': {
              backgroundColor: "#303844",
              boxShadow: 'none',
              color: "#303844"
            },
            '& .MuiSlider-active': {
              backgroundImage: "linear-gradient(45deg, #e53b77, #e66451)",
              boxShadow: 'none',
              color: "#e66451"
            },
            '& .MuiSlider-markLabelActive': {

              color: "#e66451"
            }
          }
        }
      },
      MuiButton: {
        variants: [{
          props: {
            variant: 'contained',

          },
          style: {
            backgroundImage: "linear-gradient(45deg, #e53b77, #e66451)",
            borderRadius: 7,
            color: 'white',
            textTransform: 'capitalize'
          }
        }]
      }
    }
  });

  return <>
    <ThemeProvider theme={darkTheme}>
      <WebSocketContext.Provider value={socket}>
        <PreferanceProvider>
          <BoardProvider>
            <Component {...pageProps} />
          </BoardProvider>
        </PreferanceProvider>
      </WebSocketContext.Provider>
    </ThemeProvider>
  </>;
}
