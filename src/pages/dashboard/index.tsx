import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonPage,
  IonRow,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonText,
  IonItem,
  IonCardSubtitle,
  IonList,
  IonNote,
  IonItemDivider,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  useIonRouter,
  IonSkeletonText,
  isPlatform,
  IonGrid,
  IonSpinner,
} from "@ionic/react";
import {
  logOutOutline,
  calendarNumberOutline,
  logInOutline,
  checkmarkCircleOutline,
  locationOutline,
  refresh,
  list,
  listCircle,
  addCircle,
} from "ionicons/icons";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import BaseUrl from "../../connect/Config";

import { formatDateTime, formatTime } from "../../helper/general";
import "./dashboard.scss";
import PreviewPhotoModal from "./PreviewPhotoModal";
import { deviceLocation } from "../../hooks/deviceLocation";
import { deviceInfo } from "../../hooks/deviceInfo";
import { usePhoto } from "../../hooks/usePhoto";
import { apiCall } from "../../connect/api";
import Loader from "../../components/Loader";
import { SwiprPage } from "../../components/SwiperPage";
import { ProfileImage } from "../../components/ProfileImage";
import { userStatusBar } from "../../hooks/userStatusBar";
import { NotificationIcon } from "../../components/NotificationIcon";
import { OneSignalService } from "./OneSignalService";
import secureLocalStorage from "react-secure-storage";
import { survey_bg } from "../../connect/Images";
const Dashboard: React.FC = () => {
  const { location, enableLocation } = deviceLocation();
  const { devideInfo, logDeviceInfo } = deviceInfo();
  const { startInitialize } = OneSignalService();
  const { takePhoto, photos, deletePhoto } = usePhoto();
  const [isOpen, setIsOpen] = useState(false);
  const [refreshcount, setRefreshcount] = useState(0);
  const { currentUser, showToast, setNotificationCount }: any = useStateContext();
  const [frame, setframe] = useState("");
  const [todayAttendenceIN, setTodayAttendenceIN] = useState<any>({});
  const [todayAttendenceOUT, setTodayAttendenceOUT] = useState<any>({});
  const [location_detail, setLocation_detail] = useState<any>({});
  const [noticeMessage, setNoticeMessage] = useState<string>("");
  const [workingdetail, setWorkingDetail] = useState<any>({});
  const [sliderList, setSliderList] = useState<any>([]);
  const [achievements, setAchievements] = useState<any>([]);
  const [officeLeave, setOfficeLeave] = useState<any>([]);
  const [userLeave, setUserLeave] = useState<any>([]);
  const [isCheckedIn, setisCheckedIn] = useState<boolean>(true);
  const [isCheckedOut, setisCheckedOut] = useState<boolean>(true);
  const [photosdes, setPhotodes] = useState("IN");
  const ionRouter = useIonRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dateTime = formatDateTime(new Date());
  const { call_secure_api, call_secure_get_api } = apiCall();
  const { lightStatusBar } = userStatusBar();
  useEffect(() => {
    dashboarData();
    lightStatusBar();
    enableLocation();
    logDeviceInfo();
    getCount();
    if (photos) {
      setIsOpen(true);
    }
  }, [photos, refreshcount]);

  useEffect(() => {
    if (isPlatform("capacitor") && Object.keys(devideInfo).length > 0) {
      if (!secureLocalStorage.getItem("one_token")) {
        startInitialize(devideInfo);
      }
    }
  }, [devideInfo]);

  const takattendence = (photo: string) => {
    setPhotodes(photo);
    takePhoto();
  };

  const dashboarData = () => {
    call_secure_get_api("dashboard").then(
      async (resolve: any) => {
        if (resolve.status === true) {
          setLocation_detail(resolve.data.location_detail);
          setWorkingDetail(resolve.data.working_detail);
          setSliderList(resolve.data.slider_list);
          setAchievements(resolve.data.achievements);
          setframe(resolve.data.frame);
          setOfficeLeave(resolve.data.office_leave_data);
          setUserLeave(resolve.data.user_leave_data);
          setisCheckedIn(resolve.data.isCheckIN);
          setisCheckedOut(resolve.data.isCheckOUT);
          setTodayAttendenceIN(resolve.data.attendenceIN);
          setTodayAttendenceOUT(resolve.data.attendenceOUT);
          setNoticeMessage(resolve.data.noticeMessage);
        } else {
          // showToast()
          showToast(resolve.message, "", "danger");
        }
      },
      (reject: any) => {
        showToast("Server Error", "", "danger");
      }
    );
  };

  const getCount = () => {
    call_secure_get_api("notification/count").then(
      async (resolve: any) => {
        if (resolve.status === true) {
          setNotificationCount(resolve.data);
          // modalHandler();
        } else {
        }
      },
      (reject: any) => { }
    );
  };
  const reloadCurrentPage = () => {
    setIsLoading(true);
    setTimeout(() => {
      setRefreshcount((oldPhoto) => oldPhoto + 1);
      setIsLoading(false);
    }, 2000);

  }
  const uploadPhoto = () => {
    const dataparam = {
      image_link: photos,
      device_location: location,
      device_info: devideInfo,
      phototype: photosdes,
    };
    setIsLoading(true);
    call_secure_api("attendence/upload_image", dataparam).then(
      async (resolve: any) => {
        if (resolve.status === true) {
          showToast(resolve.message, "", "success");
          deletePhotos();
        } else {
          showToast(resolve.message, "", "danger");
        }
        setIsLoading(false);
      },
      (reject: any) => {
        showToast("Server Error", "", "danger");
      }
    );
  };

  const modalHandler = () => {
    setIsOpen(false);
  };
  const deletePhotos = () => {
    deletePhoto();
    setIsOpen(false);
  };
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      setRefreshcount((oldPhoto) => oldPhoto + 1);
      event.detail.complete();
    }, 2000);
  };

  const attendencePage = (e: any) => {
    e.preventDefault();
    ionRouter.push("./attendace");
  };
  const gotoProfile = () => {
    ionRouter.push('/tabs/profile');
  }
const navigateTo = (route:any)=>{
  ionRouter.push(route);
}

  return (
    <IonPage className="">
      <Loader message={""} loading={isLoading} />
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="dashboard-header">
          <IonRow
            className="ion-align-items-center"
            style={{ paddingTop: "18px" }}
          >
            <IonCol size="3">
              <div className="image-center">
                <ProfileImage />
              </div>
            </IonCol>
            <IonCol size="7">
              <IonLabel style={{ color: "white", fontSize: "18px" }}>
                {currentUser.full_name || (
                  <IonSkeletonText
                    animated={true}
                    style={{ width: "50%" }}
                  ></IonSkeletonText>
                )}
              </IonLabel>
              <br />
              <IonLabel style={{ color: "white" }}>
                {currentUser.reg_code}
              </IonLabel>
            </IonCol>
            <IonCol size="2">
              <NotificationIcon />
            </IonCol>
          </IonRow>
        </div>
        <PreviewPhotoModal
          isOpen={isOpen}
          photos={photos}
          location={location}
          dateTime={dateTime}
          photosdes={photosdes}
          deletePhoto={deletePhotos}
          uploadPhoto={uploadPhoto}
          modalHandler={modalHandler}
        />
        <div className="ion-dashboard">
          <IonCard className="ds-card" mode="ios">
            <IonCardHeader className="headertop">
              <IonCardSubtitle>Take Attendance from</IonCardSubtitle>
            </IonCardHeader>
            <IonList mode="ios">
              {location_detail.school_name ? (
                <IonItem>
                  <IonIcon
                    className="Icon-location"
                    aria-hidden="true"
                    icon={locationOutline}
                    slot={"start"}
                  ></IonIcon>
                  <IonLabel className="location_info ">
                    <IonText className="fs-13">
                      <strong>
                        {location_detail.school_name
                          ? " " + location_detail.school_name
                          : ""}
                      </strong>
                      <br />
                      {location_detail.village_name
                        ? " " + location_detail.village_name
                        : ""}
                      {location_detail.district_name
                        ? ", " + location_detail.district_name
                        : ""}
                      {location_detail.state_name
                        ? ", " + location_detail.state_name
                        : ""}
                    </IonText>
                  </IonLabel>
                </IonItem>
              ) : (
                <div>
                  {" "}
                  <IonSkeletonText
                    animated={true}
                    style={{ width: "80%", height: "20px" }}
                  ></IonSkeletonText>
                  <IonSkeletonText
                    animated={true}
                    style={{ width: "60%", height: "20px" }}
                  ></IonSkeletonText>
                </div>
              )}
              {officeLeave.detail && (
                <IonItem mode="ios" lines="none">
                  <IonLabel className="leave_line">
                    <IonText>
                      <h4>{officeLeave.title}</h4>
                      <p>{officeLeave.detail}</p>
                      <p>{officeLeave.date}</p>
                      <p>{officeLeave.total}</p>
                    </IonText>
                  </IonLabel>
                </IonItem>
              )}
              {userLeave.detail && (
                <IonItem mode="ios" lines="none">
                  <IonLabel className="leave_line">
                    <IonText>
                      <h4>{userLeave.title}</h4>
                      <p>{userLeave.detail}</p>
                      <p>{userLeave.date}</p>
                      <p>{userLeave.total}</p>
                    </IonText>
                  </IonLabel>
                </IonItem>
              )}
              {noticeMessage && (
                <IonItem mode="ios" lines="none">
                  <IonLabel className="leave_line msg-line">
                    <IonText>
                      <h4>{noticeMessage}</h4>
                    </IonText>
                  </IonLabel>
                </IonItem>
              )}

              <IonItem mode="ios" lines="none">
                <IonLabel className="ion-text-center">
                  <IonText>
                    <div className="ion-padding">
                      {formatTime(workingdetail.check_in)}
                    </div>
                    <IonButton
                      fill="outline"
                      disabled={isCheckedIn}
                      onClick={() => takattendence("IN")}
                    >
                      <IonIcon
                        aria-hidden="true"
                        icon={
                          isCheckedIn ? checkmarkCircleOutline : logInOutline
                        }
                      ></IonIcon>
                      Check In
                    </IonButton>
                  </IonText>
                </IonLabel>
                {isLoading && <IonSpinner name="lines-small"></IonSpinner>}
                <IonButton onClick={() => reloadCurrentPage()} fill="solid" >
                  <IonIcon icon={refresh}></IonIcon>
                </IonButton>
                <IonLabel className="ion-text-center">
                  <IonText>
                    <div className="ion-padding">
                      {formatTime(workingdetail.check_out)}
                    </div>
                    <IonButton
                      fill="outline"
                      color="danger"
                      disabled={isCheckedOut}
                      onClick={() => takattendence("OUT")}
                    >
                      <IonIcon
                        aria-hidden="false"
                        icon={
                          isCheckedOut ? checkmarkCircleOutline : logOutOutline
                        }
                      ></IonIcon>
                      Check Out
                    </IonButton>
                  </IonText>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCard>
        </div>
        <div className="check_in_date">
          <div >
            <strong className="text-danger">Note:</strong> The check-in/check-out button is only active during specific <span className="text-primary" onClick={(e) => gotoProfile()}>time frames.</span>
          </div>
        </div>
        <IonGrid>
          <IonRow className="ion-padding-left ion-padding-right" style={{
            backgroundImage: `url(${survey_bg})`, backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover', backgroundPosition: 'center'
          }}>
            <IonCol>
              <div className="button-container blr-bg  round" onClick={()=>navigateTo('./take-survey')}>
                <IonIcon color="primary" icon={addCircle}></IonIcon>
                <p className="fw-bolder text-black fs-12">Take Survey</p>
              </div>
            </IonCol>
            <IonCol >
              <div className="button-container blr-bg  round" onClick={()=>navigateTo('./survey-list')}>
                <IonIcon color="primary" icon={listCircle}></IonIcon>
                <p className="fw-bolder text-black fs-12">Survey List</p>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonRow>
          <IonCol>
            <IonItemDivider className="divider">
              <IonLabel>Your activity</IonLabel>
              <IonButton
                fill="clear"
                color="primary"
                slot="end"
                onClick={(e) => attendencePage(e)}
              >
                View all
              </IonButton>
            </IonItemDivider>
          </IonCol>
        </IonRow>
        <IonCard>
          <IonList>
            <IonItem lines="none" className={isCheckedIn ? "bg1" : ""}>
              <IonIcon
                aria-hidden="true"
                icon={todayAttendenceIN?.created_at ? checkmarkCircleOutline : logInOutline}
                slot="start"
              ></IonIcon>
              <IonLabel>
                <IonText>
                  <h2>Check In</h2>
                  <p>Time</p>
                </IonText>
              </IonLabel>
              <IonNote slot="end">
                {(todayAttendenceIN?.created_at && formatDateTime(todayAttendenceIN?.created_at, 'time')) || "No record"}
              </IonNote>
            </IonItem>
          </IonList>
        </IonCard>
        <IonCard>
          <IonList>
            <IonItem lines="none" className={isCheckedOut ? "bg2" : ""}>
              <IonIcon
                aria-hidden="true"
                icon={todayAttendenceOUT?.created_at ? checkmarkCircleOutline : logOutOutline}
                slot="start"
              ></IonIcon>
              <IonLabel>
                <IonText>
                  <h2>Check Out</h2>
                  <p>Time</p>
                </IonText>
              </IonLabel>
              <IonNote slot="end">
                {(todayAttendenceOUT?.created_at && formatDateTime(todayAttendenceOUT?.created_at, 'time')) || "No record"}
              </IonNote>
            </IonItem>
          </IonList>
        </IonCard>
        <IonCard>
          <IonList>
            <IonItem
              lines="none"
              className="leave-bg"
              detail
              routerLink="/leave-list"
            >
              <IonIcon
                aria-hidden="true"
                icon={calendarNumberOutline}
                slot="start"
              ></IonIcon>
              <IonLabel>
                <IonText>
                  <h2>Leave Reqeust</h2>
                  {/* <p>Date</p> */}
                </IonText>
              </IonLabel>
              {/* <IonNote slot="end">Request</IonNote> */}
            </IonItem>
          </IonList>
        </IonCard>
        {achievements && (
          <IonCard className="bg3">
            <IonRow>
              <IonCol>
                <IonLabel className="fs-16 p-3 mb-3 text-color fw-semibold">
                  Employee Of the Month
                </IonLabel>
              </IonCol>
              <IonCol size="12">
                <SwiprPage
                  image={achievements}
                  url={BaseUrl.resource_url}
                  frame={frame}
                />
              </IonCol>
            </IonRow>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;