import { useState } from "react";
export default function InputMovie({ text }) {
  const [focusInput, setFocusInput] = useState(false);

  function handleBlurInput(e) {
    if (e.target.value.length === 0) {
      setFocusInput(false);
    }
  }
  return (
    <div className="relative">
      <span
        className={`font-secondary absolute transition-all -translate-y-[50%] left-3 text-gray-400 px-2 bg-white ${
          focusInput ? "top-0 z-10" : "top-[50%]"
        }`}
      >
        {text}
      </span>
      <input
        type="text"
        className="border w-full h-12 outline-none px-3 text-xl bg-transparent relative"
        onFocus={() => setFocusInput(true)}
        onBlur={handleBlurInput}
      />
    </div>
  );
}
