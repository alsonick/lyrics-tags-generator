import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export const Input = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <input
      className="flex border items-center p-2 rounded-lg outline-none focus:ring focus:ring-black duration-300 px-4"
      {...props}
    />
  );
};
