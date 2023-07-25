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
      href: "/dashboard/about",
      icon: BsCalculator,
    },
    {
      name: "Trening",
      href: "/about",
      icon: AiOutlineHome,
    },
  ];
  const { isCollapsedSidebar, toggleSidebarcollapse } =
    useContext(SidebarContext);
  return (
    <>
      <div className="absolute bg-white  ease-out h-screen">
        <button className="btn">
          <AiOutlineArrowLeft
            className="h-12 w-12"
            onClick={toggleSidebarcollapse}
          />
        </button>{" "}
        <div>
          <aside className="sidebar " data-collapse={isCollapsedSidebar}>
            <ul>
              {sidebarItems.map(({ name, href, icon: Icon }) => (
                <li className="text-xl " key={name}>
                  <Link
                    href={href}
                    className="flex"
                    data-collapse={isCollapsedSidebar}
                  >
                    <Icon className="m-4 " />
                    <div className="sidebar__name ">{name}</div>
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
