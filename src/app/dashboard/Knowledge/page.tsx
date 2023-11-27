import React from "react";

import getBlog from "@/actions/getBlog";
import { PageBlogContent } from "./components/PageFileComponent";

export const revalidate = 0;

const Knowledge = async () => {
  const blog = await getBlog();
  return (
    <>
      {" "}
      <div className="flex justify-center items-center  flex-col">
        dwddwwwd
        <PageBlogContent blog={blog} />
      </div>
      <div className="columns flex">
        <div className="column is-four-fifths">is-four-fifths</div>
        <div className="column">Auto</div>
        <div className="column">Auto</div>
      </div>
    </>
  );
};

export default Knowledge;
