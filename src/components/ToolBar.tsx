import {
  IonButton,
  IonButtons,
  IonIcon,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";

export const ToolBar = (props: any) => {
  const ionRouter = useIonRouter();
  const back = () => {
    if(ionRouter.canGoBack()){
        ionRouter.goBack();
    }else{
      ionRouter.push('tabs/dashboard');
    }
  };
  return (
    <IonToolbar>
      <IonButtons slot="start">
        {props.button && (
          <IonButton onClick={(e) => back()}>
            <IonIcon aria-hidden="true" icon={arrowBack}></IonIcon>
          </IonButton>
        )}
      </IonButtons>
      <IonTitle>{props.title}</IonTitle>
    </IonToolbar>
  );
};
