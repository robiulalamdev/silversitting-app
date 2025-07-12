// hooks/useAuth.ts
import { USER_CONFIG } from "@/config";
import { setUser } from "@/redux/features/user/userSlice";
import { RootState } from "@/redux/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  // You can add more helper functions or derived states here
  const isAuthenticated = !!user;

  const onLogout = useCallback(() => {
    USER_CONFIG.REMOVE_FROM_STORAGE(USER_CONFIG.TOKEN_NAME);
    dispatch(setUser(null));
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    onLogout,
    // future functions like logout(), refreshToken(), etc.
  };
};
