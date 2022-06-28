export const Icon = (props: { icon: string; className?: string }) => {
  return (
    <span
      className={`material-symbols-outlined 4k:text-5xl ${props.className}`}
    >
      {props.icon}
    </span>
  );
};
