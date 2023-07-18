import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { BsCalculator } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { IconBaseProps } from "react-icons";

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
      href: "/dashboard/calculator",
      icon: BsCalculator,
    },
    {
      name: "Trening",
      href: "/dashboard/training",
      icon: AiOutlineHome,
    },
  ];

  return (
    <>
      {" "}
      <div>
        <aside className="h-screen bg-white w-64">
          {" "}
          <ul>
            {sidebarItems.map(({ name, href, icon: Icon }) => (
              <li className="text-xl flex" key={name}>
                <Link href={href}>
                  <Icon className=" flex" />
                  <span>{name}</span>
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
    </>
  );
}
