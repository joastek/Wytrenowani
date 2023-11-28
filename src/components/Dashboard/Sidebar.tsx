"use client";
import "@/styles/globals.css";
import Link from "next/link";
import { useContext, useState } from "react";
import { IconType } from "react-icons";
import CalculateIcon from "@mui/icons-material/Calculate";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { SidebarContext } from "../../providers/SideBarContext";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PersonIcon from "@mui/icons-material/Person";
import RestoreIcon from "@mui/icons-material/Restore";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import React from "react";
import {
  Backdrop,
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";

interface SidebarItem {
  id: number;
  name: string;
  href: string;
  icon: any;
}
export default function Sidebar() {
  const sidebarItems: SidebarItem[] = [
    {
      id: 1,
      name: "Strona główna",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      id: 2,
      name: "Cele",
      href: "/dashboard/Targets",
      icon: PersonIcon,
    },
    {
      id: 3,
      name: "Kalkulator",
      href: "/dashboard/Calculator",
      icon: CalculateIcon,
    },
    {
      id: 4,
      name: "Jedzenie",
      href: "/dashboard/Food",
      icon: LocalDiningIcon,
    },
    {
      id: 5,
      name: "Trening",
      href: "/dashboard/TrainingPlan",
      icon: FitnessCenterIcon,
    },
    {
      id: 6,
      name: "Historia",
      href: "/dashboard/History",
      icon: RestoreIcon,
    },
    {
      id: 7,
      name: "Wiedza",
      href: "/dashboard/Knowledge",
      icon: AutoStoriesIcon,
    },
  ];

  const actions = [
    {
      icon: (
        <Link href="/dashboard">
          <HomeIcon />
        </Link>
      ),
      name: (
        <>
          <Link href="/dashboard">Strona główna</Link>
        </>
      ),
      href: "/dashboard",
      id: 1,
    },
    {
      icon: (
        <Link href="/dashboard/Targets">
          <PersonIcon />
        </Link>
      ),
      name: (
        <>
          <Link href="/dashboard/Targets">Cele</Link>
        </>
      ),
      id: 2,
    },
    {
      icon: (
        <Link href="/dashboard/Calculator">
          {" "}
          <LocalDiningIcon />
        </Link>
      ),
      name: (
        <>
          <Link href="/dashboard/Calculator">Kalorie</Link>
        </>
      ),
      id: 3,
    },
    {
      icon: (
        <Link href="/dashboard/TrainingPlan">
          <FitnessCenterIcon />
        </Link>
      ),
      name: (
        <>
          <Link href="/dashboard/TrainingPlan">Trening</Link>
        </>
      ),
      id: 4,
    },
    {
      icon: (
        <Link href="/dashboard/History">
          <RestoreIcon />
        </Link>
      ),
      name: (
        <>
          <Link href="/dashboard/History">Historia</Link>
        </>
      ),
      id: 5,
    },
    {
      icon: (
        <Link href="/dashboard/Knowledge">
          <AutoStoriesIcon />
        </Link>
      ),
      name: (
        <>
          <Link href="/dashboard/Knowledge">Wiedza</Link>
        </>
      ),
      id: 6,
    },
  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isCollapsedSidebar, toggleSidebarcollapse } =
    useContext(SidebarContext);
  const isSmallScreen = window.innerWidth <= 1000;
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);
  return (
    <>
      <div className=" fixed ease-out    h-full flex z-[100] text-white">
        <div className={`hamburger ${isNavbarOpened ? "is-active" : ""}`}>
          <Box sx={{ position: "relative", ml: 3, mt: 3, height: 120 }}>
            <Backdrop open={open} />
            <SpeedDial
              sx={{
                "& .MuiFab-primary": {
                  color: "#101820",
                  width: 70,
                  height: 70,
                  backgroundColor: "#EDB90C",
                },
              }}
              ariaLabel="SpeedDial tooltip example"
              icon={
                <SpeedDialIcon
                  sx={{
                    "&.MuiSvgIcon-root  ": {
                      color: "red",
                      background: "red",
                    },
                  }}
                />
              }
              onClose={handleClose}
              onOpen={handleOpen}
              open={open}
              direction="down"
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.id}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  tooltipOpen
                  tooltipPlacement="right"
                  onClick={handleClose}
                  sx={{
                    "& .MuiSpeedDial-actions": {
                      color: "#101820",
                      width: 70,
                      height: 70,
                      backgroundColor: "#EDB90C",
                    },
                  }}
                />
              ))}
            </SpeedDial>
          </Box>{" "}
        </div>
        <div
          className={`  bg-contrast  rounded-[1rem] accountNavBar ${
            isNavbarOpened ? "is-active" : ""
          }`}
        >
          <button className="btn">
            <KeyboardDoubleArrowLeftIcon
              className="h-12 w-12"
              onClick={toggleSidebarcollapse}
            />
          </button>{" "}
          <aside className="sidebar  flex" data-collapse={isCollapsedSidebar}>
            <ul>
              {sidebarItems.map(({ id, name, href, icon: Icon }) => (
                <li
                  className="text-xl my-6 text-center flex items-center"
                  key={id}
                >
                  <Link
                    key={id}
                    href={href}
                    className=" flex items-center"
                    data-collapse={isCollapsedSidebar}
                  >
                    <Icon className=" w-8 my-2" />
                    <div className="sidebar__name justify-center">{name}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
