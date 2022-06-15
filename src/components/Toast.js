import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../store/slices/actionSlice";

export const Toast = () => {
  const dispatch = useDispatch();
  const { toast } = useSelector((state) => state.actions);
  useEffect(() => {
    setTimeout(() => {
      dispatch(setToast({ showToast: false, type: "", message: "" }));
    }, 2000);
  }, [toast.showToast]);
  return (
    <>
      {toast?.showToast && (
        <div className="vl-toast">
          <div className={`alert m-radius ${toast.type}`}>{toast.message}</div>
        </div>
      )}
    </>
  );
};
