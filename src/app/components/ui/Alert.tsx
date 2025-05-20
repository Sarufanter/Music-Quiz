import {
  IoCheckmarkCircleOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { BiErrorCircle } from "react-icons/bi";
import { cn } from "@/lib/utils";

const Alert = ({
  success,
  error,
  message,
}: {
  success?: boolean;
  error?: boolean;
  message?: string;
}) => {
  return (
    <div
      className={cn(
        "my-2 flex items-center gap-2 p-3 rounded-md",
        success && "bg-green-100 text-green-500",
        error && "bg-rose-100 text-rose-500",
        !success && !error && " bg-blue-100 text-blue-500"
      )}
    >
      <span>
        {success && <IoCheckmarkCircleOutline size={20} />}
        {error && <BiErrorCircle size={20} />}
        {!success && !error && <IoInformationCircleOutline size={20} />}
      </span>
      {message}
    </div>
  );
};

export default Alert;
