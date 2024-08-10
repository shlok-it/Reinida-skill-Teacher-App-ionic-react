import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonLabel,
  IonCard,
  useIonLoading,
  IonText,
  useIonAlert,
  IonItem,
  IonList,
} from "@ionic/react";
import { homeOutline, listCircleOutline, listOutline, logInOutline, logOutOutline, person, personOutline } from "ionicons/icons";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import { ToolBar } from "../../components/ToolBar";
import "./menulist.scss";
import { useHistory } from "react-router";
const MenuList = () => {
  const { currentUser }: any = useStateContext();
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  const history = useHistory();
  const menu: any = [
    {
      link: "/tabs/dashboard",
      label: "Home",
      icon: homeOutline,
    },
    {
      link: "/tabs/attendace",
      label: "Attendance",
      icon: listCircleOutline,
    },
    {
      link: "/tabs/profile",
      label: "Profile",
      icon: personOutline,
    },
    {
      link: "/leave-list",
      label: "Leave Request",
      icon: logInOutline,
    },
    {
      link: "/salary",
      label: "Salary",
      icon: listOutline,
    },
    {
      link: "#",
      label: "Report",
      icon: listOutline,
    },
  ];
  useEffect(() => {
    dismiss();
  }, [currentUser]);

  return (
    <IonPage>
      <ToolBar title="Menu" />
      <IonContent>
        <IonGrid>
          <IonRow>
            {menu.map((item: any, index: number) => {
              return (
                <IonCol size="6" key={index}>
                  <IonCard className="ion-no-margin ion-text-center">
                    <IonList key={index}>
                      <IonItem
                        lines="none"
                        className="ion-menu"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(item.link);
                        }}
                      >
                        <IonLabel>
                          <IonText>
                            <IonIcon
                              aria-hidden="true"
                              icon={item.icon}
                            ></IonIcon>
                            <h2>{item.label}</h2>
                          </IonText>
                        </IonLabel>
                      </IonItem>
                    </IonList>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MenuList;
