import { IonApp, isPlatform, setupIonicReact, useIonAlert } from "@ionic/react";
import "react-toastify/dist/ReactToastify.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./assets/scss/page-loader.scss";
/* Theme variables */
import "./theme/variables.css";
import "./assets/scss/theme.scss";
import { App as mobapp } from "@capacitor/app";
import Routes from "./routes";
import { useEffect, useState } from "react";
import { apiCall } from "./connect/api";
import secureLocalStorage from "react-secure-storage";
import { useStateContext } from "./contexts/ContextProvider";
import AppLoader from "./pages/appLoader/index";
import { useAppUpdateNotifier } from "./hooks/useAppUpdateNotifier";
import { userStatusBar } from "./hooks/userStatusBar";

setupIonicReact({
  rippleEffect: true,
  animated: !isPlatform("mobileweb"),
  hardwareBackButton: false,
  mode: "ios",
});
const App: React.FC = () => {
  const { call_secure_api } = apiCall();
  const { setIsAuthed } = useStateContext();
  const _token = secureLocalStorage.getItem("app_access_token");
  const [presentAlert] = useIonAlert();
  const useAppUpdate = useAppUpdateNotifier();
  const [isLoader, setIsLoader] = useState(false);
  const { darkStatusBar } = userStatusBar();
  useEffect(() => {
    if (isPlatform("capacitor")) {
      useAppUpdate.performImmediateUpdate();
      darkStatusBar();    
      mobapp.addListener("backButton", async (ev) => {
        if (
          window.location.pathname === "/login" ||
          window.location.pathname == "/" ||
          window.location.pathname == "/tabs" ||
          window.location.pathname == "/home" ||
          window.location.pathname === "/tabs/dashboard"
        ) {
          exitApp();
        } else {
          history.back();
        }
      });
    }

    if (_token) {
      checkSession();
    } else {
      setIsLoader(true);
      setIsAuthed(false);
    }
  }, []);

  const checkSession = () => {
    call_secure_api("login/session").then(
      (resolve: any) => {
        if (resolve.status === true) {
          setIsAuthed(true);
        } else {
          setIsAuthed(false);
        }
        setIsLoader(true);
      },
      () => {
        setIsAuthed(false);
      }
    );
  };
  const exitApp = () => {
    const data = {
      header: "Do you want to exit this app?",
      buttons: [
        {
          text: "No",
          cssClass: "alert-button-cancel",
          handler: () => {},
        },
        {
          text: "Yes",
          cssClass: "alert-button-confirm",
          handler: () => {
            mobapp.exitApp();
          },
        },
      ],
    };
    return presentAlert(data);
  };
  return <IonApp>{isLoader ? <Routes /> : <AppLoader />}</IonApp>;
};

export default App;
