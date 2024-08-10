import {
  IonCol,
  IonAvatar,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonLabel,
  IonCard,
  useIonLoading,
  IonCardContent,
  IonItem,
  useIonRouter,
  IonText,
  IonChip,
  useIonAlert,
} from "@ionic/react";
import {
  notifications,
  arrowBack,
  person,
  chevronForward,
  lockClosed,
  settings,
  logOut,
  document,
  readerOutline,
  pushOutline,
  calendar,
  watch,
  watchOutline,
  timeOutline,
  callOutline,
} from "ionicons/icons";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";

import secureLocalStorage from "react-secure-storage";
import BaseUrl from "../../connect/Config";
import { userplaceholder } from "../../connect/Images";
import { ProfileImage } from "../../components/ProfileImage";
import { NotificationIcon } from "../../components/NotificationIcon";
const Profile = () => {
  const ionRouter = useIonRouter();
  const { currentUser, isAuthed, setIsAuthed }: any = useStateContext();
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  useEffect(() => {
    dismiss();
  }, []);
  const goBackPreveius = () => {
    if (ionRouter.canGoBack()) {
      ionRouter.goBack();
    }
  };
  const userLogOut = () => {
    secureLocalStorage.removeItem("app_authenticated");
    secureLocalStorage.removeItem("app_access_token");
    setIsAuthed(false);
    // ionRouter.push("/login", "root", "replace");
  };
  const logoutUser = () => {
    const data = {
      header: "Are you sure you're logging out?",
      buttons: [
        {
          text: "No",
          cssClass: "alert-button-cancel",
          handler: () => {},
        },
        {
          text: "Yes",
          cssClass: "alert-button-confirm",
          handler: () => {
            userLogOut();
          },
        },
      ],
    };
    return presentAlert(data);
  };
  const gotoNotification=()=>{
    ionRouter.push('/notification');
  }
  return (
    <IonPage className="">
      <IonContent fullscreen>
        <div className="account-header">
          <IonRow
            className="ion-align-items-center"
            style={{ paddingTop: "18px" }}
          >
            <IonCol size="6" className="ion-text-left text-white fw-bold ps-3">
              <div onClick={() => goBackPreveius()}>
                <IonIcon className="custom-back me-2" icon={arrowBack} />
                <IonLabel>Back</IonLabel>
              </div>
            </IonCol>
            <IonCol size="6" className="ion-text-right pe-3">
              <NotificationIcon />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="ion-text-center">
              <div className="d-inline-block">
                <ProfileImage />
              </div>
            </IonCol>
            <IonCol size="12" className="ion-text-center">
              <IonLabel className="text-white">
                {currentUser.full_name}
              </IonLabel>
            </IonCol>
            <IonCol size="12" className="ion-text-center">
              <IonLabel className="text-white">{currentUser.reg_code}</IonLabel>
            </IonCol>
            {currentUser.check_in_timing && (
              <IonCol size="6" className="ion-text-center">
                <IonChip className="chip_name">
                  <IonIcon icon={timeOutline}></IonIcon>
                  <IonLabel>
                    <IonText>
                      <strong> {currentUser.check_in_timing}</strong>
                      <br />
                      <span>Your check in time</span>
                    </IonText>
                  </IonLabel>
                </IonChip>
              </IonCol>
            )}
            {currentUser.check_out_timing && (
              <IonCol size="6" className="ion-text-center">
                <IonChip className="chip_name">
                  <IonIcon icon={timeOutline}></IonIcon>
                  <IonLabel>
                    <IonText>
                      <strong> {currentUser.check_out_timing}</strong>
                      <br />
                      <span>Your check out time</span>
                    </IonText>
                  </IonLabel>
                </IonChip>
              </IonCol>
            )}
          </IonRow>
        </div>
        <div className="ion-account-container">
          <IonCard className="ion-padding account-menu">
            <IonCardContent>
              <IonItem color={"none"} detail routerLink="/leave-list">
                <IonIcon icon={calendar} slot="start" />
                <IonLabel>
                  <IonText>
                    <strong>Leave Request</strong>
                    <p>View details and send request</p>
                  </IonText>
                </IonLabel>
              </IonItem>
              <IonItem color={"none"} detail routerLink="/personal-information">
                <IonIcon icon={person} slot="start" />
                <IonLabel>
                  <IonText>
                    <strong> Personal Information</strong>
                    <p>View personal details</p>
                  </IonText>
                </IonLabel>
              </IonItem>
              {/* <IonItem color={'none'} lines='none' detail routerLink="/document-detail">
                                <IonIcon icon={document} slot='start' />
                                <IonLabel>Document Detail</IonLabel>
                            </IonItem> */}
              {/* <IonItem color={'none'} lines='none'  detail routerLink="/txn-history">
                                <IonIcon icon={pushOutline} slot='start' />
                                <IonLabel>Txn History</IonLabel>
                            </IonItem> */}
              <IonItem color={"none"} detail routerLink="/temrs-condition">
                <IonIcon icon={readerOutline} slot="start" />
                <IonLabel>
                  <IonText>
                    <strong> Terms & Conditions</strong>
                    <p>Read terms and conditions here</p>
                  </IonText>
                </IonLabel>
              </IonItem>
              <IonItem
                color={"none"}
               
                detail
                routerLink="/privacy-policy"
              >
                <IonIcon icon={readerOutline} slot="start" />
                <IonLabel>
                  <IonText>
                    <strong> Privacy Policy</strong>
                    <p>Read privacy and policy here</p>
                  </IonText>
                </IonLabel>
              </IonItem>
              <IonItem color={"none"} detail routerLink="/change-password">
                <IonIcon icon={lockClosed} slot="start" />
                <IonLabel>
                  <IonText>
                    <strong> Change Password</strong>
                    <p>Change current password</p>
                  </IonText>
                </IonLabel>
              </IonItem>
              <IonItem color={"none"} detail routerLink="/help-and-support">
                <IonIcon icon={callOutline} slot="start" />
                <IonLabel>
                  <IonText>
                    <strong>Help & Support</strong>
                    <p>Contact us for any query </p>
                  </IonText>
                </IonLabel>
              </IonItem>
              {/* <IonItem color={'none'} lines='none'>
                                <IonIcon icon={settings} slot='start' />
                                <IonLabel>Settings</IonLabel>
                                
                            </IonItem> */}
              <IonItem color={"none"} onClick={() => logoutUser()}>
                <IonIcon className="text-danger" icon={logOut} slot="start" />
                <IonLabel className="text-danger">
                  <IonText>
                    <strong> Logout</strong>
                    <p>Sign out of the app</p>
                  </IonText>
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
