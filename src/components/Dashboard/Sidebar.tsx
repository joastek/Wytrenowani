"use client";
import "@/styles/globals.css";
import Link from "next/link";
import { useContext } from "react";
import { IconType } from "react-icons";
import { BsCalculator } from "react-icons/bs";
import { AiOutlineHome, AiOutlineArrowLeft } from "react-icons/ai";
import { SidebarContext } from "./SideBarContext";

interface SidebarItem {
  name: string;
  href: string;
  icon: IconType;
}
export default function Sidebar() {
  const sidebarItems: SidebarItem[] = [
    {
      name: "Strona główna",
      href: "/dashboard",
      icon: AiOutlineHome,
    },
    {
      name: "Kalkulator",
      href: "/dashboard/Calculator",
      icon: BsCalculator,
    },
    {
      name: "Trening",
      href: "/dashboard/TrainingPlan",
      icon: AiOutlineHome,
    },
    {
      name: "Jedzenie",
      href: "/dashboard/Food",
      icon: AiOutlineHome,
    },
  ];
  const { isCollapsedSidebar, toggleSidebarcollapse } =
    useContext(SidebarContext);
  return (
    <>
      <div className=" fixed ease-out    h-full flex z-[100]">
        <div className="m-6 bg-bar  rounded-[2rem] ">
          <button className="btn">
            <AiOutlineArrowLeft
              className="h-12 w-12"
              onClick={toggleSidebarcollapse}
            />
          </button>{" "}
          <aside className="sidebar" data-collapse={isCollapsedSidebar}>
            <ul>
              {sidebarItems.map(({ name, href, icon: Icon }) => (
                <li className="text-xl" key={name}>
                  <Link
                    href={href}
                    className="flex"
                    data-collapse={isCollapsedSidebar}
                  >
                    <Icon className="m-4" />
                    <div className="sidebar__name">{name}</div>
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
