import { useState } from "react";
import { LuBadgeInfo } from "react-icons/lu";

export default function Button({ children, ...props }) {
  const [showDescription, setShowDescription] = useState(false);
  const { contentWarning, description, ...rest } = props;
  let color = "bg-gray-200";
  if (contentWarning.includes(children)) {
    color = "bg-red-500";
  }

  return (
    <div className="w-fit h-fit relative">
      <button
        className={`py-1 px-4 rounded-full ${color}`}
        {...rest}
        onMouseEnter={() => setShowDescription(true)}
        onMouseLeave={() => setShowDescription(false)}
      >
        {children}
      </button>
      {showDescription && (
        <span className="absolute -bottom-16 min-w-[250px] bg-gray-200 py-1 px-3 z-10 rounded-md gap-2 flex justify-center items-start">
          <LuBadgeInfo className="mt-1 w-5 h-5" />
          {description}
        </span>
      )}
    </div>
  );
}
