import { IonIcon, useIonRouter } from "@ionic/react";
import { apiCall } from "../connect/api";
import { useEffect, useState } from "react";
import { notifications } from "ionicons/icons";
import { useStateContext } from "../contexts/ContextProvider";
export const NotificationIcon = () => {
  const ionRouter = useIonRouter();
  const { notificationCount}: any = useStateContext();

  const gotoNotification = () => {
    ionRouter.push("/notification");
  };
  return (
    <div onClick={() => gotoNotification()} >
      <IonIcon
        aria-hidden="true"
        icon={notifications}
        className="home-header-icon"
      />
      {notificationCount>0&&<span className="notification-count">{notificationCount}</span>}
    </div>
  );
};
