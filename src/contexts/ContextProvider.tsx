import { IonLoading, IonicSafeString, ToastButton } from "@ionic/react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
  currentUser: {},
  notificationCount: 0,
  state_list: [],
  district_list: [],
  block_list: [],
  isAuthed:false,
  isLoading: {
    isOpen: false,
    message: "Please wait...",
    duration: 2000,
  },
  toast: {
    message: "",
    isOpen: false,
    position: "top",
    color: "primary",
  },
  
  setNotificationCount: (pram?: any) => {},
  setCurrentUser: (pram?: any) => {},
  setStateList: (pram?: any) => {},
  setDistrictList: (pram?: any) => {},
  setBlockList: (pram?: any) => {},
  showToast: ( message: any,
    position: string = "top",
    color:string= "primary") => {},
  setToast: (pram?: any) => {},
  showLoader: (isOpen: boolean = false,message?:string,duration?: number) => {},
  setIsAuthed: (pram?: any) => {},
});
interface ToastOptions {
  header?: string;
  message?: string | IonicSafeString;
  cssClass?: string | string[];
  duration?: number;
  buttons?: (ToastButton | string)[];
  position?: "top" | "bottom" | "middle";
  translucent?: boolean;
  animated?: boolean;
  icon?: string;
  htmlAttributes?: { [key: string]: any };
  color?: string;
  keyboardClose?: boolean;
  id?: string;
  isOpen: boolean;
}
export const ContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser]: any = useState({});
  const [state_list, setStateList]: any = useState([]);
  const [district_list, setDistrictList]: any = useState([]);
  const [block_list, setBlockList]: any = useState([]);
  const [isAuthed, setIsAuthed]: any = useState(false);
  const [notificationCount, setNotificationCount]: any = useState(0);
  const tst: ToastOptions = {
    message: "",
    isOpen: false,
    position: "top",
    color: "primary",
  };
  const [toast, setToast]: any = useState(tst);
  const loader = { isOpen: false, message: "Please wait...", duration: 2000 };
  const [isLoading, setIsLoading]: any = useState(loader);
  const showToast: any = (
    message: any,
    position: string = "top",
    color: "primary"
  ) => {
    setToast({
      message: message,
      isOpen: true,
      position: position,
      color: color,
    });
    setTimeout(() => {
      setToast(tst);
    }, 5000);
  };
  const showLoader: any = (
    isOpen: boolean = false,
    message?: 'Please Wait...',
    duration?: "2000"
  ) => {
    setIsLoading({ message: message, isOpen: isOpen, duration: duration });
    setTimeout(() => {
      setIsLoading(tst);
    }, 5000);
  };
  return (
    <StateContext.Provider
      value={{
        currentUser,
        state_list,
        district_list,
        block_list,
        setCurrentUser,
        setStateList,
        setDistrictList,
        setBlockList,
        toast,
        showToast,
        setToast,
        isLoading,
        showLoader,
        setIsAuthed,
        isAuthed,
        notificationCount,
        setNotificationCount
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
