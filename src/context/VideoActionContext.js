import { createContext, useContext, useReducer } from "react";

const VideoActionContext = createContext();

const VideoActionProvider = ({ children }) => {
  const videoActionReducer = (state, action) => {
    switch (action.type) {
      case "SET_SHOW_TOAST":
        return {
          ...state,
          toast: { ...state.toast, showToast: action.payload },
        };
      case "SET_TOAST_MESSAGE":
        return { ...state, toast: { ...state.toast, message: action.payload } };
      case "SET_TOAST_TYPE":
        return { ...state, toast: { ...state.toast, type: action.payload } };
    }
  };
  const initialState = {
    toast: { showToast: true, type: "", message: "" },
  };
  const [videoActionState, videoActionDispatch] = useReducer(
    videoActionReducer,
    initialState
  );
  return (
    <VideoActionContext.Provider
      value={{ videoActionState, videoActionDispatch }}
    >
      {children}
    </VideoActionContext.Provider>
  );
};

const useVideoAction = () => useContext(VideoActionContext);

export { useVideoAction, VideoActionProvider };
