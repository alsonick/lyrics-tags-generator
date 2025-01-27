export const LoadingIndicator = () => {
  return (
    <div className="flex text-center flex-col">
      <picture className="mb-2">
        <img src="./flying-doggo.gif" width={150} alt="A flying dog" />
      </picture>
      <span className="text-black">Generating...</span>
    </div>
  );
};
