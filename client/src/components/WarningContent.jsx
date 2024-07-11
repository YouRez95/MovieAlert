import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci";

export default function WarningContent({ text, typeContent, contentWarning }) {
  return (
    <div className="relative grid gap-2 h-fit">
      <h2 className="text-xl font-primary capitalize secondary-color">
        {text}
      </h2>
      <div className="grid gap-5 ml-3">
        {typeContent.map((item) => {
          const itemWarning = contentWarning.includes(item.content);
          return (
            <div
              key={item.id}
              className={`flex items-center gap-2  w-fit border-l-2 font-secondary px-2 py-1 cursor-pointer group relative ${
                itemWarning
                  ? "bg-red-100 border-red-700"
                  : "bg-gray-100 border-gray-500"
              }`}
            >
              {itemWarning ? <FaCheckCircle /> : <FaXmark />}
              <p>{item.content}</p>
              <CiCircleInfo className="w-5 h-5" />
              <span className="absolute z-10 p-2 rounded-md top-full -right-full w-[200px] group-hover:flex hidden bg-red-500">
                {item.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
