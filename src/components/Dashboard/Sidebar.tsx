"use client";
import "@/styles/globals.css";
import Link from "next/link";
import { useContext } from "react";
import { IconType } from "react-icons";
import { BsCalculator } from "react-icons/bs";
import { AiOutlineHome, AiOutlineArrowLeft } from "react-icons/ai";
import { SidebarContext } from "./SideBarContext";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GiMeal } from "react-icons/gi";
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
      icon: GiWeightLiftingUp,
    },
    {
      name: "Jedzenie",
      href: "/dashboard/Food",
      icon: GiMeal,
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
          <aside className="sidebar  flex" data-collapse={isCollapsedSidebar}>
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
