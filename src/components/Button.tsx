export const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      {...props}
      className="flex items-center justify-center text-white font-semibold duration-300
      bg-black rounded-lg p-2 px-4 outline-none focus:ring focus:ring-black focus:ring-offset-2"
    >
      {props.children}
    </button>
  );
};
