"use client";

import { createContext, useState, ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const initialValue = {
  isCollapsedSidebar: true,
  toggleSidebarcollapse: () => {},
};

const SidebarContext = createContext(initialValue);

const SidebarProvider = ({ children }: Props) => {
  const [isCollapsedSidebar, setCollapse] = useState(true);

  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider
      value={{ isCollapsedSidebar, toggleSidebarcollapse }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
