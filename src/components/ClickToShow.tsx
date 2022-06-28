import React, { useState } from "react";

export const ClickToShow = (props: {
  btnText: string;
  children: React.ReactNode;
}) => {
  const [hidden, showHidden] = useState(false);
  const onClickHandler = () => {
    showHidden((prev) => !prev);
  };
  const txt = hidden ? "Hide" : "Show";
  return (
    <section>
      <div className="w-full pb-3">
        <button
          className="rounded-lg hover:bg-gray-100 hover:shadow-lg p-2 mx-auto font-medium text-blue-900"
          onClick={onClickHandler}
        >
          {txt} {props.btnText}
        </button>
      </div>

      {hidden && <div className="space-y-8">{props.children}</div>}
    </section>
  );
};
