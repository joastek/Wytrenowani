"use client";

import { SidebarProvider } from "@/providers/SideBarContext";
import { Provider } from "react-redux";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import store from "@/store/store";
import Sidebar from "@/components/Dashboard/Sidebar";
import AccountSidebar from "@/components/Dashboard/AccountSidebar";
import { useUser } from "../hooks/useUser";
import ToasterProvider from "@/providers/ToasterProvider";
import LoginButtons from "@/components/LoginPage/LoginButtons";

import Home from "../page";
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
// const supabase = createClient(
//   `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}`,
//   `${process.env.NEXT_PUBLIC_SUPABASE_BASE_CODE}`
// );
export default function DashboardLayout1({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  return (
    <>
      {!user ? (
        <>
          <Home />
        </>
      ) : (
        <>
          {" "}
          <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider theme={theme}>
                {/* <SessionContextProvider supabaseClient={supabase}>
                  {" "} */}
                <SidebarProvider>
                  <Sidebar />

                  {children}

                  <AccountSidebar />
                </SidebarProvider>{" "}
                {/* </SessionContextProvider> */}
              </ThemeProvider>{" "}
            </LocalizationProvider>
          </Provider>
        </>
      )}
    </>
  );
}
