import { useQuery } from "@tanstack/react-query"
import { getUser } from "../lib/api";

export const AUTH = "auth";

const useAuth = (opts = {}) => {
    const { data: user, ...rest } = useQuery({
        queryKey: [AUTH],
        queryFn: getUser,
        staleTime: Infinity, // Allow us to call useAuth anywhere in our app and never gonna fetch user, return the data from the cache
        refetchOnWindowFocus: false,
        ...opts
    })

    return {
        user,
        ...rest
    }
}

export default useAuth;