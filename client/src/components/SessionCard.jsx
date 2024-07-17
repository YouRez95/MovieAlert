import { HiMiniXMark } from "react-icons/hi2";
import { useMutation } from "@tanstack/react-query";
import { deleteSession } from "../lib/api";
import queryClient from "../config/queryClient";
import { ImSpinner8 } from "react-icons/im";

export default function SessionCard({ session }) {
  const { _id, createdAt, userAgent, isCurrent } = session;

  const {
    mutate: handleDeleteSession,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      queryClient.setQueryData(["sessions"], (cache) =>
        cache.filter((session) => session._id !== _id)
      );
    },
  });

  return (
    <div className="w-[90%] m-auto border p-3 flex items-center gap-10 mb-4">
      <div className="font-primary">
        <p>
          {new Date(createdAt).toLocaleString("en-US")}{" "}
          {isCurrent && <span className="">(Current Session)</span>}
        </p>
        <span className="font-secondary text-sm">{userAgent}</span>
      </div>
      {!isCurrent ? (
        <div className="bg-red-200 border p-1">
          {isPending ? (
            <ImSpinner8 className={`w-6 h-6 animate-spin`} />
          ) : (
            <HiMiniXMark
              className={`w-8 h-8 cursor-pointer`}
              onClick={() => handleDeleteSession(_id)}
            />
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
