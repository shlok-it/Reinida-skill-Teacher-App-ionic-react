import {
  IonContent,
  IonImg,
  IonPage,
  IonSpinner,
} from "@ionic/react";
import { logo,icon_fornt } from "../../connect/Images";
import React, { useEffect, useState } from "react";

import "./index.scss";
const AppLoader = () => {
  return (
    <React.Fragment>
      <IonPage>
        <IonContent fullscreen className="bg-img" scrollY={false}>
          <div className="page-vertical">
            <div>
              <IonImg className="logo" src={logo} />
            </div>
            <div >
              <IonImg className="icon" src={icon_fornt} />
            </div>
            <div className="loader-image">
              <IonSpinner className="spinner_color" name="lines-small"></IonSpinner><br />
              <div>Loading...</div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default AppLoader;
