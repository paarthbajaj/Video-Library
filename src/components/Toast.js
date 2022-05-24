import { useEffect } from "react";
import { useVideoAction } from "../context/VideoActionContext";

export const Toast = () => {
  const { videoActionState, videoActionDispatch } = useVideoAction();
  useEffect(() => {
    setTimeout(() => {
      videoActionDispatch({ type: "SET_SHOW_TOAST", payload: false });
    }, 2000);
  }, [videoActionState.toast.showToast]);
  return (
    <>
      {videoActionState.toast?.showToast && (
        <div className="vl-toast">
          <div className={`alert m-radius ${videoActionState.toast.type}`}>
            {videoActionState.toast.message}
          </div>
        </div>
      )}
    </>
  );
};
