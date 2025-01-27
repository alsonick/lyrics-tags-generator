export const Step = ({
  step,
  text,
  children,
}: {
  step: number;
  text: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col mt-12">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center text-white bg-black rounded-full font-semibold text-sm h-10 w-10">
          {step}
        </div>
        <p className="text-gray-600 ml-2">{text}</p>
      </div>
      {children}
    </div>
  );
};
