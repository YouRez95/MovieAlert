import { useQuery } from "@tanstack/react-query";
import { getMysessions } from "../lib/api";
import SessionCard from "./SessionCard";
export default function ProfileSessions() {
  const {
    data: sessions,
    isPending,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: getMysessions,
  });

  return (
    <div>
      {isSuccess &&
        sessions &&
        sessions.map((session) => (
          <SessionCard key={session._id} session={session} />
        ))}
    </div>
  );
}
