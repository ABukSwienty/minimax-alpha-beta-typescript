import { useState } from "react";
import { createBorders } from "./Tile";

export const DummyBoard = (props: { onClick: () => void }) => {
  const tiles = Array.from({ length: 9 }, (v, k) => (
    <div
      key={k}
      className={`inline-flex justify-center items-center ${createBorders(k)}`}
    />
  ));

  const [text, setText] = useState("Click to play");

  const handleOnClick = () => {
    setText("Calculating board...");
  };

  return (
    <section
      onClick={() => {
        handleOnClick();
        setTimeout(() => {
          props.onClick();
        }, 1000);
      }}
      className={`group relative h-[80vw] w-[80vw] sm:h-[50vh] sm:w-[50vh] grid grid-cols-3
grid-rows-3`}
    >
      <div className="opacity-0 group-hover:opacity-100 duration-200 ease-in-out transition-all cursor-pointer absolute backdrop-blur-sm w-full h-full flex items-center justify-center">
        <p className="text-3xl text-gray-700">{text}</p>
      </div>
      {tiles}
    </section>
  );
};
