import {
  IonAvatar,
  IonContent,
  IonImg,
  IonPage,
  IonLabel,
  IonCard,
  IonItem,
  IonList,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  useIonRouter,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSelectOption,
  IonSelect,
  IonInput,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./attendace.scss";
import { ToolBar } from "../../components/ToolBar";
import BaseUrl from "../../connect/Config";
import ViewDetail from "./ViewDetail";

import { Skelton } from "../../components/Skelton";
import { apiCall } from "../../connect/api";
import { formatMonth, formatDateTime } from "../../helper/general";
import { NoRecordFound } from "../../components/NoRecordFound";
import { cross_img } from "../../connect/Images";
const Attendace: React.FC = () => {
  const { call_secure_get_api } = apiCall();
  const [modalItem, setModalItem] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [refreshcount, setRefreshcount] = useState(1);
  const ionRouter = useIonRouter();
  const [items, setItems] = useState([]);
  const helabel = {
    total_check_in: 0,
    total_check_out: 0,
    cl: 0,
    pl: 0,
    office_leave: 0,
    user_leave: 0,
    total_sunday: 0,
    working_days: 0,
  };
  const [headerLabel, setHeaderLabel] = useState(helabel);
  const [isSkelton, setIsSkelton] = useState(true);
  const this_month = formatMonth(
    new Date(new Date().setMonth(new Date().getMonth()))
  );
  const [values, setValues] = useState(this_month);
  const [isSearch, setIsSearch] = useState(0);
  useEffect(() => {
    setIsSkelton(true);
    getAttendence();
  }, [refreshcount,values ]);

  const backButton: any = () => {
    ionRouter.goBack();
  };
  const searchFun = () => {
    setIsSearch(isSearch + 1);
  };
  const updateInputValue = (event: any) => {
    setValues(() => (event.target.value));
    // setValues((oldValues) => ({
    //   ...oldValues,
    //   [event.target.name]: event.target.value,
    // }));
  };
  const getAttendence = () => {
    const search_key = values;
    call_secure_get_api(`attendence/viewAttendance?month=${search_key}`).then(
      async (resolve: any) => {
        setIsSkelton(false);
        if (resolve.status === true) {
          setItems(resolve.data.details);
          setHeaderLabel(resolve.data.headerLabel);
          // setValues((prevValue)=>({...prevValue,month:resolve.data.month}));
        } else {
          setItems([]);
          toast.error(resolve.message);
        }
      },
      (reject: any) => {
        toast.error("Server Error");
      }
    );
  };

  const modalHandler = () => {
    setIsOpen(false);
    setModalItem([]);
  };
  const modalOpen = (items: any) => {
    setIsOpen(true);
    setModalItem(items);
  };
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setItems([]);
    setIsSkelton(true);
    setTimeout(() => {
      setRefreshcount(() => refreshcount + 1);
      event.detail.complete();
    }, 2000);
  };

  const get_day_detail = (date: any, type: any) => {
    if (date.length > 0) {
      return date.map((item: any, index: number) => {
        if (item.created_at)
          return (
            <div onClick={() => modalOpen(item)} key={index}>
              <div
                className={
                  item.phototype +
                  " d-flex justify-content-start align-items-center p-1 br-8"
                }
              >
                <div>
                  <IonAvatar slot="start">
                    <IonImg
                      src={BaseUrl.resource_url + "/" + item.image_link}
                    ></IonImg>
                  </IonAvatar>
                </div>
                <div className=" text-container-leave ps-3">
                  <div className="text">
                    {item.phototype ? "Check " + item.phototype : ""}
                  </div>
                  <div className={"number"}>{formatDateTime(item.created_at,'time')}</div>
                </div>
              </div>
            </div>
          );
        else return "--";
      });
    } else {
      return (
        <div>
          <div
            className={
              type + " d-flex justify-content-start align-items-center p-1 br-8"
            }
          >
            <div>
              <IonAvatar slot="start">
                <IonImg src={cross_img}></IonImg>
              </IonAvatar>
            </div>
            <div className=" text-container-leave ps-3">
              <div className="text">{"Check " + type}</div>
              <div className={"number"}>Not found</div>
            </div>
          </div>
        </div>
      );
    }
  };

/*  const getUserLeave = (date: any, type: any) => {
    if (date.length > 0) {
      return date.map((item: any, index: number) => {
        if (index === 1) return "";
        return (
          <span key={index}>
            {type == "userLeave" ? item.leavetype : item.leave_resion}
          </span>
        );
      });
    } else {
      return "";
    }
  };*/
  return (
    <IonPage className="">
      <IonContent>
        <ToolBar title="Attendence List" />
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <ViewDetail
          isOpen={isOpen}
          item={modalItem}
          modalHandler={modalHandler}
        />
        <IonCard>
          <IonList>
            <IonItem lines="none" className="SearchTab">
              <IonInput
                type="month"
                fill="solid"
                value={values}
                placeholder="Select month"
                name="month"
                label="Select month"
                required={true}
                max={this_month}
                onIonInput={(e) => updateInputValue(e)}
              ></IonInput>

              {/* <IonButton slot="end" className="searchbtn" onClick={()=>searchFun()}>
                <IonIcon icon={searchOutline} slot="icon-only"></IonIcon>
              </IonButton> */}
            </IonItem>
          </IonList>
        </IonCard>
        <IonCard className="list-leave card-main bg-h ">
          <IonRow>
            {" "}
            <IonCol size="3">
              <div className=" text-container  ps-3">
                <div className={"number"}>{headerLabel.total_check_in}</div>
                <div className="text">Check In</div>
              </div>
            </IonCol>
            <IonCol size="3">
              <div className=" text-container ps-3">
                <div className={"number"}>{headerLabel.total_check_out}</div>
                <div className="text">Check Out</div>
              </div>
            </IonCol>
            <IonCol size="3">
              <div className=" text-container  ps-3">
                <div className={"number"}>{headerLabel.cl}</div>
                <div className="text">CL</div>
              </div>
            </IonCol>
            <IonCol size="3">
              <div className=" text-container  ps-3">
                <div className={"number"}>{headerLabel.pl}</div>
                <div className="text">PL</div>
              </div>
            </IonCol>
            <IonCol size="3">
              <div className=" text-container  ps-3">
                <div className={"number"}>{headerLabel.user_leave}</div>
                <div className="text">User Leave</div>
              </div>
            </IonCol>
            <IonCol size="3">
              <div className=" text-container  ps-3">
                <div className={"number"}>{headerLabel.office_leave}</div>
                <div className="text">Office Leave</div>
              </div>
            </IonCol>
            <IonCol size="3">
              <div className=" text-container  ps-3">
                <div className={"number"}>{headerLabel.total_sunday}</div>
                <div className="text">Sunday</div>
              </div>
            </IonCol>
            <IonCol size="3">
              <div className=" text-container  ps-3">
                <div className={"number"}>{headerLabel.working_days}</div>
                <div className="text">Working Day</div>
              </div>
            </IonCol>
          </IonRow>
        </IonCard>
        {isSkelton && <Skelton />}
        {!isSkelton && <NoRecordFound list={items} />}
        {items.map((item: any, index: number) => {
          return (
            <IonCard className="list-leave card-main" key={index}>
              <IonRow>
                <IonCol size="12">
                  <div className="text-container-leave">
                    <div>
                      {"Date"}
                      <span className={"number ps-3"}>
                        {item.day} , {item.date}
                      </span>
                    </div>
                  </div>
                  <hr className="border" />
                </IonCol>
                {(item.user_leave[0] || item.office_leave[0]) && (
                  <IonCol size="12" className="leave_bg">
                    {item.user_leave[0] ? (
                      <div className="bg-light">
                        <strong>
                          {" "}
                          Applied{" "}
                          <span className="text-success">
                            {item.user_leave[0]["leavetype"]}
                          </span>
                        </strong>
                        <p> Detail: {item.user_leave[0]["detail"]} </p>
                      </div>
                    ) : (
                      ""
                    )}
                    {item.office_leave[0] ? (
                      <div>{item.office_leave[0]["leave_resion"]}</div>
                    ) : (
                      ""
                    )}
                  </IonCol>
                )}
                {item.sunday && (
                  <IonCol size="12" className="leave_red">
                    <div className="bg-light">
                      <strong> {item.sunday}</strong>
                    </div>
                  </IonCol>
                )}
                {item.user_leave.length === 0 &&
                  item.office_leave.length === 0 &&
                  item.sunday === "" && (
                    <>
                      <IonCol size="6">
                        {get_day_detail(item.check_in, "IN")}
                      </IonCol>
                      <IonCol size="6">
                        {get_day_detail(item.check_out, "OUT")}
                      </IonCol>
                    </>
                  )}
              </IonRow>
            </IonCard>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Attendace;
