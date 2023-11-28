"use client";

import React from "react";
import { Blog } from "@/types/type";
import BlogItem from "@/components/Blog/BlogItem";
interface PagecontentProps {
  blog: Blog[];
}
export const PageBlogContent: React.FC<PagecontentProps> = ({ blog }) => {
  if (blog.length === 0) {
    return <div> Brak pomiarów wagi</div>;
  }

  return (
    <>
      <div className="flex text-2xl w-[70rem] ">
        <table className="w-full border-solid border-black ">
          <thead>
            <tr>
              <th>Waga</th>
              <th>Data</th>
              <th>Usuń</th>
            </tr>
          </thead>{" "}
          {blog.map((weightItem) => (
            <BlogItem data={weightItem} key={weightItem.name} />
          ))}
        </table>
      </div>
    </>
  );
};
