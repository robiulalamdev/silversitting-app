// hooks/useAuth.ts
import { USER_CONFIG } from "@/config";
import { IUser } from "@/lib/types/user.type";
import { setRedirectPath, setUser } from "@/redux/features/user/userSlice";
import { RootState } from "@/redux/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const { user, redirectPath } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  // You can add more helper functions or derived states here
  const isAuthenticated = !!user;

  const onLogout = useCallback(() => {
    USER_CONFIG.REMOVE_FROM_STORAGE(USER_CONFIG.TOKEN_NAME);
    dispatch(setUser(null));
  }, [dispatch]);

  const setUserData = useCallback(
    (user: IUser) => {
      dispatch(setUser(user));
    },
    [dispatch]
  );

  const setRp = (path: string | null) => {
    if (path) {
      dispatch(setRedirectPath(path));
    }
  };

  return {
    user,
    setUserData,
    isAuthenticated,
    onLogout,
    setRedirectPath: setRp,
    redirectPath,
    // future functions like logout(), refreshToken(), etc.
  };
};
