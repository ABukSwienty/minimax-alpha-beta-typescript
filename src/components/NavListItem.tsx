import React from "react";

export const NavListItem = (props: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <li
      onClick={props.onClick}
      className={`relative border py-2 md:border-none md:py-0 text-gray-700 4k:text-2xl group h-full flex items-center justify-between md:justify-evenly px-[30%] md:px-0 grow cursor-pointer hover:bg-gray-100 hover:text-gray-900 md:hover:rounded-br-none md:hover:rounded-bl-none rounded-lg ${
        props.className ?? props.className
      }`}
    >
      {props.children}
    </li>
  );
};
