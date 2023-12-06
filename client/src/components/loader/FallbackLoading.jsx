import { PulseLoader } from "react-spinners";

const FallbackLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <PulseLoader color="#42DC8F" />
    </div>
  );
};

export default FallbackLoading;
