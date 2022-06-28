export const HoverNav = (props: {
  title: string;
  text: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="absolute invisible group-hover:visible top-[2.55rem] md:rounded-tl-none left-0 md:top-12 w-full md:w-64 bg-gray-100 text-gray-900 space-y-2 shadow-xl rounded-lg p-4 4k:top-36 4k:w-96 z-50">
      <p>{props.title}</p>
      <p className="font-normal">{props.text}</p>
      {props.children ?? ""}
    </div>
  );
};
