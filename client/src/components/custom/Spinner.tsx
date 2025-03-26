import { FaSpinner } from "react-icons/fa6";

const Spinner = () => {
  return (
    <div className="flex justify-center  items-center">
      <FaSpinner className="w-10 h-10 animate-[spin_1.5s_linear_infinite] text-primary " />
    </div>
  );
};

export default Spinner;
