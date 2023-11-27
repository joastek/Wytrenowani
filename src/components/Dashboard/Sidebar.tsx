"use client";
import "@/styles/globals.css";
import Link from "next/link";
import { useContext } from "react";
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
  name: string;
  href: string;
  icon: any;
}
export default function Sidebar() {
  const sidebarItems: SidebarItem[] = [
    {
      name: "Strona główna",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      name: "Cele",
      href: "/dashboard/Targets",
      icon: PersonIcon,
    },
    {
      name: "Kalkulator",
      href: "/dashboard/calculator",
      icon: CalculateIcon,
    },
    {
      name: "Jedzenie",
      href: "/dashboard/Food",
      icon: LocalDiningIcon,
    },
    {
      name: "Trening",
      href: "/dashboard/TrainingPlan",
      icon: FitnessCenterIcon,
    },
    {
      name: "Historia",
      href: "/dashboard/History",
      icon: RestoreIcon,
    },
    {
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
    },
    {
      icon: (
        <Link href="/dashboard/calculator">
          {" "}
          <LocalDiningIcon />
        </Link>
      ),
      name: (
        <>
          <Link href="/dashboard/calculator">Kalorie</Link>
        </>
      ),
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
    },
  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isCollapsedSidebar, toggleSidebarcollapse } =
    useContext(SidebarContext);
  const isSmallScreen = window.innerWidth <= 1000;
  return (
    <>
      <div className=" fixed ease-out    h-full flex z-[100]">
        {isSmallScreen ? (
          <>
            {" "}
            <Box sx={{ position: "relative", ml: 3, mt: 3, height: 120 }}>
              <Backdrop open={open} />
              <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                icon={<SpeedDialIcon sx={{ color: "white" }} />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="down"
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.href}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipOpen
                    tooltipPlacement="right"
                    onClick={handleClose}
                  />
                ))}
              </SpeedDial>
            </Box>
          </>
        ) : (
          <>
            {" "}
            <div className=" bg-bar  z-[999] rounded-[1rem] ">
              <button className="btn">
                <KeyboardDoubleArrowLeftIcon
                  className="h-12 w-12"
                  onClick={toggleSidebarcollapse}
                />
              </button>{" "}
              <aside
                className="sidebar  flex"
                data-collapse={isCollapsedSidebar}
              >
                <ul>
                  {sidebarItems.map(({ name, href, icon: Icon }) => (
                    <li
                      className="text-xl my-6 text-center flex items-center"
                      key={name}
                    >
                      <Link
                        href={href}
                        className=" flex items-center"
                        data-collapse={isCollapsedSidebar}
                      >
                        <Icon className=" w-8 my-2" />
                        <div className="sidebar__name justify-center">
                          {name}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </>
        )}
      </div>
    </>
  );
}
