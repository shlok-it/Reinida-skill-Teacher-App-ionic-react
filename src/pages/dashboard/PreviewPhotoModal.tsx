import React, { useState } from "react";
import {
  IonButtons,
  IonGrid,
  IonCol,
  IonIcon,
  IonRow,
  IonImg,
  IonLabel,
  IonText,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import { checkmark, close, closeCircle, location } from "ionicons/icons";
const PreviewPhotoModal = (props: any) => {
  return (
    <IonModal isOpen={props.isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Check {props.photosdes}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonFab slot="fixed" horizontal="end">
        <IonFabButton
          className="fixed-fab fab-btn"
          onClick={() => props.modalHandleradd()}
        >
          <IonIcon icon={closeCircle}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonContent className="ion-padding">
        {props.photos && (
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div className="top_dateTime">{props.dateTime}</div>
                <div className="single_image ">
                  <IonImg src={props.photos} />
                </div>
                <div className="footer_button">
                  {props.location ? (
                    <IonItem>
                      <IonIcon
                        className="Icon-location"
                        aria-hidden="true"
                        icon={location}
                        slot={"start"}
                      ></IonIcon>
                      <IonLabel className="location_info">
                        <IonText>
                          {props.location["latitude"]
                            ? props.location["latitude"] + ", "
                            : ""}
                          {props.location["longitude"]
                            ? props.location["longitude"]
                            : ""}
                          {props.location["areasOfInterest"]
                            ? props.location["areasOfInterest"].map(
                                (val: any, i: number) => {
                                  return (
                                    <div key={i}>{val ? val + ", " : ""}</div>
                                  );
                                }
                              )
                            : ""}
                          {props.location["subLocality"]
                            ? props.location["subLocality"] + ", "
                            : ""}
                          {props.location["locality"]
                            ? props.location["locality"] + ", "
                            : ""}
                          {props.location["countryName"]
                            ? props.location["countryName"] + ", "
                            : ""}
                          {props.location["postalCode"]
                            ? props.location["postalCode"]
                            : ""}
                        </IonText>
                      </IonLabel>
                    </IonItem>
                  ) : (
                    ""
                  )}
                  <div className="top-30">
                    <IonIcon
                      className="reject"
                      onClick={() => props.deletePhoto()}
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
