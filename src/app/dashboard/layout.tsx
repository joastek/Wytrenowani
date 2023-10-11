"use client";

import { SidebarProvider } from "@/components/Dashboard/SideBarContext";
import { Provider } from "react-redux";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lime, purple } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import store from "@/store/store";
import Sidebar from "@/components/Dashboard/Sidebar";
import AccountSidebar from "@/components/Dashboard/AccountSidebar";
import { light } from "@mui/material/styles/createPalette";
const theme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "white",
          },
          "& label.Mui": {
            color: "white",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "white",
          },
          " .MuiF": {},
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },

    MuiInputAdornment: {
      styleOverrides: {
        root: {
          "&$focused": {
            caretColor: "white",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {},
      },
    },
  },
});
const supabase = createClient(
  "https://stvkcwqqiszetklseils.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0dmtjd3FxaXN6ZXRrbHNlaWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUzMTU1MTAsImV4cCI6MjAxMDg5MTUxMH0.sL41P_Y1oRDCLpx-PuzjUCO3--YPr0XcJ38Zrvw5Xmw"
);
export default function DashboardLayout1({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <SessionContextProvider supabaseClient={supabase}>
              {" "}
              <SidebarProvider>
                <Sidebar />

                {children}

                <AccountSidebar />
              </SidebarProvider>{" "}
            </SessionContextProvider>
          </ThemeProvider>{" "}
        </LocalizationProvider>
      </Provider>
    </>
  );
}
