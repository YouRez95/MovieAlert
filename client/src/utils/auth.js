
import queryClient from '../config/queryClient';
import { AUTH } from '../hooks/useAuth';

export const refetchUserData = () => {
  queryClient.invalidateQueries(AUTH);
}