import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="height-screen flex justify-center items-center ">
      <ImSpinner2 className="w-12 h-12 animate-spin" />
    </div>
  );
}
