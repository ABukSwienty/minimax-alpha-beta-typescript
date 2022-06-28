import React from "react";

export const NavListItem = (props: { children: React.ReactNode }) => {
  return (
    <li className="relative text-gray-700 4k:text-2xl group h-full flex items-center justify-evenly grow cursor-pointer hover:bg-gray-100 hover:text-gray-900 hover:rounded-br-none hover:rounded-bl-none rounded-lg">
      {props.children}
    </li>
  );
};
