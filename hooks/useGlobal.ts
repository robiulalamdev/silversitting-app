// hooks/useGlobal.ts
import { setShowMenu } from "@/redux/features/global/globalSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export const useGlobal = () => {
  const { showMenu } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();

  const handleShowMenu = (isShow: boolean) => {
    dispatch(setShowMenu(isShow));
  };

  return {
    handleShowMenu,
    showMenu,
  };
};
