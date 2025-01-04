import {
  IonButton,
  IonCard,
  IonCardTitle,
  IonCol,
  IonContent,
  IonInput,
  IonPage,
  IonRow,
  IonTextarea,
  IonLabel,
  IonItem,
  IonList,
  IonIcon,
  IonCardSubtitle,
  IonImg,
  IonSelectOption,
  IonSelect,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import "./index.scss";
import { arrowUpCircleOutline, closeCircle } from "ionicons/icons";

const Add = (props:any) => {
  
  return (
    <IonModal isOpen={props.isAddOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
              Leave Request
          </IonTitle>
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
      <IonContent >
      
        <IonCard className="ion-padding login-signup-form">
          <IonRow>
            <IonCol size="12" className="ion-text-center">
              <IonCardSubtitle>Leave Request</IonCardSubtitle>
            </IonCol>
          </IonRow>
          <IonList className="ion-padding-top">
            <IonItem lines="none">
              <IonInput
                type="date"
                value={props.values.date_from}
                fill="solid"
                placeholder="Start Date"
                name="date_from"
                label="From Date"
                labelPlacement="fixed"
                required={true}
                min={props.today}
                // max={props.this_month}
                onIonInput={(e) => props.updateInputValue(e)}
              ></IonInput>
            </IonItem>
            {props.errors && props.errors?.date_from && (
              <p className="error">{props.errors.date_from[0]}</p>
            )}
          </IonList>
          <IonList>
            <IonItem lines="none">
              <IonInput
                type="date"
                value={props.values.date_to}
                placeholder="End Date"
                name="date_to"
                label="To Date"
                labelPlacement="fixed"
                required={true}
                min={props.values.date_from}
                // max={props.this_month}
                onIonInput={props.updateInputValue}
              ></IonInput>
              {props.errors && props.errors?.date_to && (
                <p className="error">{props.errors.date_to[0]}</p>
              )}
            </IonItem>
          </IonList>
          <IonList>
            <IonItem lines="none">
              <IonSelect
                value={props.values.leavetype}
                placeholder="End Date"
                name="leavetype"
                label="Select"
                labelPlacement="fixed"
                onIonChange={props.updateInputValue}
              >
                <IonSelectOption value={"CL"}>CL</IonSelectOption>
                <IonSelectOption value={"PL"}>PL</IonSelectOption>
                {/* <IonSelectOption value={"None Paid Leave"}>None paid leave </IonSelectOption> */}
              </IonSelect>
              {props.errors && props.errors?.leavetype && (
                <p className="error">{props.errors.leavetype[0]}</p>
              )}
            </IonItem>
          </IonList>
          <IonList>
            <IonItem lines="none">
              <IonTextarea
                value={props.values.detail}
                labelPlacement="stacked"
                label="Reason"
                placeholder="Enter Reason"
                name="detail"
                required={true}
                rows={2}
                autoGrow={true}
                onIonInput={props.updateInputValue}
              ></IonTextarea>
              {props.errors && props.errors?.detail && (
                <p className="error">{props.errors.detail[0]}</p>
              )}
            </IonItem>
          </IonList>
          <IonList>
            <IonItem lines="none" className="text-center">
              <IonLabel>
                <IonButton expand="block" fill="clear" className="file_btn" onClick={(e)=>props.uploadfun(e)}>
                <IonIcon icon={arrowUpCircleOutline} aria-label="none" slot="start"></IonIcon>
                   Upload Application
                </IonButton>
                {/* <p><span className="text-danger">Note*: </span></p> */}
              </IonLabel>
            </IonItem>
                {props.imagelink && <IonItem lines="none" className="text-center">
              <IonLabel>
              <IonImg src={props.imagelink} className='prevImage' ></IonImg>
              </IonLabel>
            </IonItem>}
          </IonList>
          <IonList>
            <IonItem lines="none" className="text-center">
              <IonLabel>
                <IonButton
                  className="custom-button"
                  expand="block"
                  onClick={(e) => props.submit(e)}
                >
                  Send request
                </IonButton>               
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCard>
      </IonContent>
    </IonModal>
  );
};

export default Add;
