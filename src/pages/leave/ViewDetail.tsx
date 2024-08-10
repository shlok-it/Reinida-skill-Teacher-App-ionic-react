
import {
  IonCol,
  IonRow,
  IonLabel,
  IonText,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonItem,
  IonCard,
  IonFab,
  IonFabButton,
  IonImg,
} from "@ionic/react";
import BaseUrl from "./../../connect/Config";
import {
  checkmarkCircleOutline,
  close,
  closeCircle,
  closeCircleOutline,
  location,
  reloadOutline,
} from "ionicons/icons";
import { dateDiffer } from "../../helper/general";
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
          className="fixed-fab fab-btn"
          onClick={() => props.modalHandler()}
        >
          <IonIcon icon={closeCircle}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonContent>
        {props.item && (
          <IonCard className="list-leave card-main">
            <IonRow>
              <IonCol size="8">
                <div className="text-container-leave">
                  <div className="text">{"Date"}</div>
                  <div className={" number"}>
                    {props.item.date_from} - {props.item.date_to}
                  </div>
                </div>
              </IonCol>
              <IonCol size="4">
                <div
                  className={(props.item.updated_type || "Pending") + " status"}
                >
                  <IonIcon
                    icon={
                      props.item.updated_type
                        ? props.item.updated_type == "Accept"
                          ? checkmarkCircleOutline
                          : closeCircleOutline
                        : reloadOutline
                    }
                  ></IonIcon>
                  <span> {props.item.updated_type || "Pending"} </span>
                </div>
              </IonCol>
              <IonCol size="12">
                <hr className="border" />
              </IonCol>
              <IonCol size="12">
                <IonLabel color="primary fs-14">
                  <div className=" pb-2">Reason</div>
                </IonLabel>
                <IonLabel>
                  <IonText className="fs-12">
                    <div>{props.item.detail}</div>
                  </IonText>
                </IonLabel>
                {props.item.application_photo && <IonItem lines="none" className="text-center">
              <IonLabel>
             {props.item.application_photo&&<IonImg src={props.url+"/"+props.item.application_photo} className='prevImage' ></IonImg>}
              </IonLabel>
            </IonItem>}
                <IonLabel>
                  <IonText className="fs-12 ">
                    <div className="d-flex justify-content-between pt-3">
                      <div>Apply date: {props.item.created_at}</div>
                      <div>
                        {props.item.updated_type
                          ? props.item.updated_type +
                            " : " +
                            props.item.updated_date
                          : ""}
                      </div>
                    </div>
                  </IonText>
                </IonLabel>
              </IonCol>

              <IonCol size="12">
                <hr className="border" />
              </IonCol>
              <IonCol size="6">
                <div className="text-container-leave">
                  <div className="text">{"Applied day"}</div>
                  <div className={"number"}>
                    {parseInt(dateDiffer(props.item.date_from, props.item.date_to).toString()) + 1}
                  </div>
                </div>
              </IonCol>
              <IonCol size="6">
                <div className="text-container-leave text-right">
                  <div className="text">{"Approved By"}</div>
                  <div className={"number"}>
                    {props.item.updated_by || "--"}
                  </div>
                </div>
              </IonCol>
            </IonRow>
          </IonCard>
        )}
      </IonContent>
    </IonModal>
  );
};
export default ViewDetail;
