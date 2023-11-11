"use client";

import React from "react";
import { Weight } from "@/types/type";

import { useUser } from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";

import WeightItem from "@/components/History/WeightItem";
interface PagecontentProps {
  weight: Weight[];
}
export const PageContent: React.FC<PagecontentProps> = ({ weight }) => {
  if (weight.length === 0) {
    return <div> Brak pomiarów wagi</div>;
  }
  return (
    <>
      <div className="flex text-2xl">
        <table>
          <thead>
            <tr>
              <th>Waga</th>
              <th>Data</th>
              <th>Usuń</th>
            </tr>
          </thead>{" "}
          {weight.map((weightItem) => (
            <WeightItem data={weightItem} key={weightItem.user_id} />
          ))}
        </table>
      </div>
    </>
  );
};
