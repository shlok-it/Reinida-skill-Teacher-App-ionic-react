import React, { useState } from "react";
import {
  IonButtons,
  IonGrid,
  IonCol,
  IonRow,
  IonImg,
  IonLabel,
  IonText,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonItem,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import BaseUrl from "./../../connect/Config";
import { close, closeCircle, location } from "ionicons/icons";
const ViewDetail = (props: any) => {
  return (
    <IonModal isOpen={props.isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {props.item.phototype ? "CHECK " + props.item.phototype : ""}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonFab slot="fixed" horizontal="end">
        <IonFabButton
          className="fixed-fab"
          onClick={() => props.modalHandler()}
        >
          <IonIcon icon={closeCircle}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonContent className="ion-padding">
        {props.item && (
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div className="single_date ion-text-center ">
                  {props.item.created_at}
                </div>
                <div className="single_image ">
                  <IonImg
                    src={BaseUrl.resource_url + "/" + props.item.image_link}
                  />
                </div>
                <div className="footer_button">
                  {props.item.location ? (
                    <IonItem>
                      <IonIcon
                        className="Icon-location"
                        aria-hidden="true"
                        icon={location}
                        slot={"start"}
                      ></IonIcon>
                      <IonLabel className="location_info">
                        <IonText>
                          {props.item.location["latitude"]
                            ? props.item.location["latitude"] + ", "
                            : ""}
                          {props.item.location["longitude"]
                            ? props.item.location["longitude"] + ", "
                            : ""}
                          {props.item.location["areasOfInterest"]
                            ? props.item.location["areasOfInterest"].map(
                                (val: any, i: number) => {
                                  return (
                                    <div key={i}>{val ? val + ", " : ""}</div>
                                  );
                                }
                              )
                            : ""}
                          {props.item.location["subLocality"]
                            ? props.item.location["subLocality"] + ", "
                            : ""}
                          {props.item.location["locality"]
                            ? props.item.location["locality"] + ", "
                            : ""}
                          {props.item.location["countryName"]
                            ? props.item.location["countryName"] + ", "
                            : ""}
                          {props.item.location["postalCode"]
                            ? props.item.location["postalCode"] + ", "
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
                      onClick={() => props.modalHandler()}
                      aria-hidden="true"
                      icon={close}
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
export default ViewDetail;
