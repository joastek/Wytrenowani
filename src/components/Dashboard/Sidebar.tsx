"use client";
import "@/styles/function.scss";
import Link from "next/link";
import { useState } from "react";
import { IconType } from "react-icons";
import { BsCalculator } from "react-icons/bs";
import { AiOutlineHome, AiOutlineArrowLeft } from "react-icons/ai";

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
  const [isCollapsedSidebar, setSidebarCollapsed] = useState<boolean>(false);
  const handletoogleSidebarCollapsed = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <>
      <div className="relative bg-white  ease-out">
        <button className="btn">
          <AiOutlineArrowLeft
            className="h-12 w-12"
            onClick={handletoogleSidebarCollapsed}
          />
        </button>{" "}
        <div>
          <aside className="sidebar" data-collapse={isCollapsedSidebar}>
            <ul>
              {sidebarItems.map(({ name, href, icon: Icon }) => (
                <li className="text-xl " key={name}>
                  <Link href={href} className="">
                    <Icon className=" " />
                    <div className="sidebar_name ">{name}</div>
                  </Link>
                </li>
              ))}

              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
