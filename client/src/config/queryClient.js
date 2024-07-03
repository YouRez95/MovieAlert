import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // disable retry request when failed
    }
  }
})

export default queryClient;