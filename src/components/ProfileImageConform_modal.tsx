import React, { useState } from "react";
import {
  IonButtons,
  IonGrid,
  IonCol,
  IonIcon,
  IonRow,
  IonImg,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonAvatar,
  IonFab,
  IonFabButton,
  IonSpinner,
} from "@ionic/react";
import { checkmark, close, closeCircle } from "ionicons/icons";
const PreviewPhotoModal = (props: any) => {
  return (
    <IonModal isOpen={props.isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Modal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonFab slot="fixed" horizontal="end">
        <IonFabButton
          className="fixed-fab fab-btn"
          onClick={() => props.modalHandler()}
        >
          <IonIcon icon={closeCircle}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonContent className="ion-padding">
        {props.photos && (
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div className="footer_button">
                  <div className="image-container">
                    <IonAvatar style={{ height: "200px", width: "200px" }}>
                      <IonImg src={props.photos} />
                    </IonAvatar>
                  </div>
                  <div className="top-30">
                    <IonIcon
                      className="reject"
                      onClick={() => props.modalHandler()}
                      aria-hidden="true"
                      icon={close}
                    ></IonIcon>
                    <IonIcon
                      className="accept"
                      onClick={() => props.uploadPhoto()}
                      aria-hidden="true"
                      icon={checkmark}
                    ></IonIcon>
               
                  </div>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonModal>
  );
};
export default PreviewPhotoModal;
