export const Link = (props: { link: string; text: string }) => {
  return (
    <a className="underline text-blue-900" href={props.link}>
      {props.text}
    </a>
  );
};
