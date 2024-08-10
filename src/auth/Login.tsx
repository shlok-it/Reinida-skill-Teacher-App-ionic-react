import {
  IonButton,
  IonCol,
  IonContent,
  IonPage,
  IonRow,
  useIonAlert,
  IonImg,
  IonLabel,
  IonRouterLink,
  useIonRouter,
} from "@ionic/react";
import secureLocalStorage from "react-secure-storage";
import CustomField from "../components/CustomField";
import { useLoginFields } from "../data/fields";
import { useEffect, useState } from "react";
import { validateForm, getValues } from "../data/utils";
import { apiCall } from "../connect/api";
import { logo } from "../connect/Images";
import "./login.scss";
import Loader from "../components/Loader";
import { useStateContext } from "../contexts/ContextProvider";
import { userStatusBar } from "../hooks/userStatusBar";

const Login = () => {
  const [presentAlert] = useIonAlert();
  const ionRouter = useIonRouter();
  const fields = useLoginFields();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const { call_api } = apiCall();
  const { toast, isAuthed, setIsAuthed } = useStateContext();
  const { darkStatusBar } = userStatusBar();
  const submit = (e: any) => {
    e.preventDefault();
    const errors = validateForm(fields);
    setErrors(errors);
    if (!errors.length) {
      let options = getValues(fields);
      setIsLoading(true);
      call_api("login/authenticate", options).then(
        async (resolve: any) => {
          if (resolve.status === true) {
            secureLocalStorage.setItem("app_authenticated", true);
            secureLocalStorage.setItem(
              "app_access_token",
              resolve.data["accessToken"]
            );
            setIsAuthed(true);
            setTimeout(() => {
              ionRouter.push("/",'root','replace');
              setIsLoading(false);
            }, 1000);
          } else {
            presentAlert({
              header: "Alert!",
              message: resolve.message,
              buttons: ["OK"],
            });
          }
          setIsLoading(false);
        },
        (reject: any) => {
          presentAlert({
            header: "Alert!",
            message: "Server Error",
            buttons: ["OK"],
          });
        }
      );
    }
  };
  useEffect(() => {
    darkStatusBar();
    return () => {
      fields.forEach((field) => field.input.state.reset(""));
      setErrors(false);
    };
  }, []);
  return (
    <IonPage>
      <IonContent className="bg-img">
        <div>
          <IonImg className="logologin" src={logo} />
        </div>
        <div className="page-login">
          <div className="form-container">
            <Loader message={""} loading={isLoading} />
            <IonRow>
              <IonCol size="12">
                {fields.map((field, index) => {
                  return (
                    <CustomField key={index} field={field} errors={errors} />
                  );
                })}
              </IonCol>
            </IonRow>
            <IonButton
              className="btn"
              expand="block"
              onClick={(e) => submit(e)}
            >
              Login
            </IonButton>
            <IonLabel className="fs-12 ion-padding">
              By continuing, you agree to our
              <IonRouterLink routerLink="/temrs-condition">
                <span className="text-primary">Terms of Use</span>
              </IonRouterLink>
              and
              <IonRouterLink routerLink="/privacy-policy">
                <span className="text-primary">Privacy Policy</span>
              </IonRouterLink>
            </IonLabel>
          </div>
          <div></div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
