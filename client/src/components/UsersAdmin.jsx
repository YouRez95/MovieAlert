import { useMutation } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { getUsersAdmin } from "../lib/api";
import { formatDate } from "../utils/date";
import { BADGES } from "../data/badges";

const UsersAdmin = forwardRef(({ max, order, page, setPage }, ref) => {
  const {
    mutate: getUsers,
    data: users,
    isError,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["users", max, order, page],
    mutationFn: () => getUsersAdmin({ page, max, order }),
  });

  useEffect(() => {
    getUsers();
  }, [page, order, max]);

  useImperativeHandle(ref, () => ({
    refreshUsers: getUsers,
  }));

  return (
    <div className="">
      <div>
        <table className="w-full mx-9 my-3">
          <thead>
            <tr className="flex justify-between items-center border-b-4 p-1 bg-[#14213d10] font-primary text-lg">
              <th className="flex-1 flex min-w-[25%]">Email</th>
              <th className="flex-1">badge</th>
              <th className="flex-1">Movies Submitted</th>
              <th className="flex-1">Created on</th>
              <th className="flex-1">Verified</th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              users.users.map((user) => (
                <tr
                  className="flex justify-between items-center p-1 border-2 cursor-pointer font-secondary-bold hover:scale-105 transition-all relative"
                  key={user._id}
                >
                  <td className="flex-1 text-center flex min-w-[25%]">
                    {user.email}
                  </td>
                  <td className="flex-1 text-center">
                    {BADGES.filter((badge) => badge.id === user.badge)[0].level}
                  </td>
                  <td className="flex-1 text-center">{user.moviesSubmitted}</td>
                  <td className="flex-1 text-center">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="flex-1 gap-3 flex justify-center ">
                    {user.verified ? "Verified" : "Not verified"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isSuccess && (
        <div className="flex gap-2 py-10 items-center justify-center w-full font-primary">
          <span>Page</span>
          <select
            className="border-2 py-4 px-3"
            value={page}
            onChange={(e) => setPage(e.target.value)}
          >
            {Array.from(
              { length: Math.ceil(users.countUsers / max) },
              (_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              )
            )}
          </select>
          <span>Of {Math.ceil(users.countUsers / max)}</span>
        </div>
      )}
    </div>
  );
});

export default UsersAdmin;
