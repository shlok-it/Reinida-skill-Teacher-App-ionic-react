import {
  IonCol,
  IonContent,
  IonIcon,
  IonPage,
  IonRow,
  IonCard,
  useIonLoading,
  IonCardHeader,
  IonFab,
  IonFabButton,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonCardSubtitle,
  IonBadge,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./index.scss";
import { ToolBar } from "../../components/ToolBar";
import BaseUrl from "../../connect/Config";
import ViewDetail from "./ViewDetail";
import {
  add,
  checkmarkCircleOutline,
  closeCircleOutline,
  reloadOutline,
} from "ionicons/icons";
import { Skelton } from "../../components/Skelton";
import { apiCall } from "../../connect/api";
import { NoRecordFound } from "../../components/NoRecordFound";
import { dateDiffer, formatDate, formatMonth } from "../../helper/general";
import { UniqueItemList } from "../../hooks/useUniquData";
import Add from "./Add";
import { Alert } from "../../hooks/Alert";
import Loader from "../../components/Loader";
import { useCameraService } from "../../hooks/useCameraService";
const LeaveList: React.FC = () => {
  const { uniqueItem } = UniqueItemList();
  const [items, setItems] = useState([]);
  const [modalItem, setModalItem] = useState([]);
  const emptyUserleave = {
    accept: "0",
    cl: "0",
    pending: "0",
    pl: "0",
    reject: "0",
    total: "0",
  };
  const emptyofficeLeave = { cl: "0", id: "0", pl: "0" };
  const [userLeave, setUserLeave] = useState(emptyUserleave);
  const [officeLeave, setOfficeLeave] = useState(emptyofficeLeave);
  const [session_year, setSession_year] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isScroll, setIsScrollDisable] = useState(true);
  const [isSkelton, setIsSkelton] = useState(true);
  const [present, dismiss] = useIonLoading();
  const [refreshcount, setRefreshcount] = useState(1);
  const { upload, imagelink, deleteImageLink } = useCameraService();
  const [errors, setErrors]: any = useState({});
  const [statusUpdate, setStatusUpdate] = useState(0);

  const { call_secure_get_api } = apiCall();
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [colName, setColName] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [search_key, setSearch_key] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { simpleAlert } = Alert();
  const { call_secure_api } = apiCall();
  const date = new Date();
  const todayDate = formatDate(date);
  const [today, setToday] = useState(todayDate);
  const formdata = {
    date_from: "",
    date_to: "",
    detail: "",
    leavetype: "CL",
    application_photo: "",
  };
  const [values, setValues] = useState(formdata);
  const leaveStatus = [
    {
      number: userLeave.cl + " / " + officeLeave.cl,
      name: "CL",
      class: "text-primary",
    },
    {
      number: userLeave.pl + " / " + officeLeave.pl,
      name: "PL",
      class: "text-success",
    },
    {
      number:
        parseInt(userLeave.cl) +
        parseInt(userLeave.pl) +
        "/" +
        (parseInt(officeLeave.cl) + parseInt(officeLeave.pl)),
      name: "Total Leave",
      class: "text-secondary",
    },
  ];
  const applicationStatus = [
    {
      number: userLeave.pending,
      name: "Pending",
      class: "text-warning",
    },

    {
      number: userLeave.reject,
      name: "Rejected",
      class: "text-danger",
    },
    {
      number: userLeave.accept,
      name: "Accept",
      class: "text-success",
    },
    {
      number: userLeave.total,
      name: "Total",
      class: "text-dark",
    },
  ];

  const horizontalButton = [
    {
      title: "All",
      link: "",
      class: "active",
    },
    {
      title: "Pending",
      link: "Pending",
      class: "inactive",
    },
    {
      title: "Accept",
      link: "Accept",
      class: "inactive",
    },
    {
      title: "Reject",
      link: "Reject",
      class: "inactive",
    },
  ];
  useEffect(() => {
    dismiss();
    setIsSkelton(true);
    getList(1);
    userLeavedetail();
  }, [search_key, refreshcount, statusUpdate]);

  const getList = (
    pagenum = page,
    size = perPage,
    col = colName,
    sort = sortBy
  ) => {
    call_secure_get_api(
      `leave/getlist?page=${pagenum}&per_page=${size}&colName=${col}&sortBy=${sort}&search_key=${search_key}&delay=1`
    ).then(
      async (resolve: any) => {
        setIsSkelton(false);
        if (resolve.status === true) {
          if (resolve.data.data.length > 0) {
            const item: any = items.concat(resolve.data.data);
            const uniqueItems = uniqueItem(item);
            setItems(uniqueItems);
            setIsScrollDisable(false);
          } else {
            setIsScrollDisable(true);
          }
          setPage(pagenum);
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
  const userLeavedetail = () => {
    call_secure_get_api(`leave/userLeavedetail`).then(
      async (resolve: any) => {
        setIsSkelton(false);
        if (resolve.status === true) {
          setOfficeLeave(resolve.data.officeLeave);
          setUserLeave(resolve.data.userLeave);
          setSession_year(resolve.data.sesion_year);
          setToday(resolve.data.today);
        } else {
          // setItems([]);
          // toast.error(resolve.message);
        }
      },
      (reject: any) => {
        toast.error("Server Error");
      }
    );
  };
  const updateInputValue = (event: any) => {
    setValues((oldValues) => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };
  const uploadfun = (e: any) => {
    const image = upload();
  };
  const submit = (e: any) => {
    e.preventDefault();
    const datediff = dateDiffer(values.date_from, values.date_to);
    values.application_photo = imagelink;
    if (values.date_from == "") {
      simpleAlert("", "Please enter From date");
    } else if (values.date_to == "") {
      simpleAlert("", "Please enter To date");
    } else if (datediff=="Invaid date") {
      simpleAlert("", "Please enter Valid date");
    } else if (values.detail == "") {
      simpleAlert("", "Please enter To Leave Reason");
    } else if (values.application_photo == "") {
      simpleAlert("", "Please upload application");
    } else {
      setIsLoading(true);
      call_secure_api("leave/add", values).then(
        (resolve: any) => {
          if (resolve.status === true) {
            simpleAlert("", resolve.message);
            deleteImageLink();
            setValues(formdata);
            modalHandleradd();
            setStatusUpdate((old) => old + 1);
          } else {
            simpleAlert("", resolve.message);
          }
          setIsLoading(false);
        },
        (reject: any) => {
          simpleAlert("", "Server Error");
          setIsLoading(false);
        }
      );
    }
  };

  const fiterStatus = (val: any) => {
    setItems([]);
    setIsSkelton(true);
    setSearch_key(val);
  };

  const modalHandler = () => {
    setIsOpen(false);
    // setModalItem([]);
  };

  const modalHandleradd = () => {
    setIsAddOpen(false);
  };
  const modalOpen = (items: any) => {
    setIsOpen(true);
    setModalItem(items);
  };
  const addModalOpen = () => {
    setIsAddOpen(true);
  };
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setItems([]);
    setIsSkelton(true);
    setTimeout(() => {
      setRefreshcount(() => refreshcount + 1);
      event.detail.complete();
    }, 2000);
  };
  return (
    <IonPage className="">
      <IonContent>
        <Loader message={""} loading={isLoading} />
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="leave-header">
          <ToolBar title="Leave" button="true" />
        </div>
        <div className="leave-header-content">
          <IonCard className="card-main">
            <IonRow>
              <IonCol size="12">
                <IonCardHeader>
                  <IonCardSubtitle color={"dark"} className="">
                    Leave Status {session_year[0] + "-" + session_year[1]}
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCol>
              {leaveStatus.map((leave, index) => {
                return (
                  <IonCol size="4" key={index}>
                    <div className="text-container">
                      <div className={leave.class + " number"}>
                        {leave.number}
                      </div>
                      <div className="text">{leave.name}</div>
                    </div>
                  </IonCol>
                );
              })}

              <IonCol size="12">
                <hr className="border" />
              </IonCol>
              <IonCol size="12">
                <IonCardHeader>
                  <IonCardSubtitle color={"dark"} className="">
                    Application Status
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCol>
              {applicationStatus.map((leave, index) => {
                return (
                  <IonCol size="3" key={index}>
                    <div className="text-container">
                      <div className={leave.class + " number"}>
                        {leave.number}
                      </div>
                      <div className="text">{leave.name}</div>
                    </div>
                  </IonCol>
                );
              })}
            </IonRow>
          </IonCard>
          <div className="scroll-horizontal">
            {horizontalButton.map((hor, key) => {
              return (
                <div key={key}>
                  <IonBadge
                    className={
                      "h-button " +
                      (search_key == hor.link ? "active" : "inactive")
                    }
                    onClick={() => fiterStatus(hor.link)}
                  >
                    {hor.title}
                  </IonBadge>
                </div>
              );
            })}
          </div>

          <ViewDetail
            isOpen={isOpen}
            url={BaseUrl.resource_url}
            item={modalItem}
            modalHandler={modalHandler}
          />
          <Add
            isAddOpen={isAddOpen}
            item={modalItem}
            values={values}
            errors={errors}
            uploadfun={uploadfun}
            imagelink={imagelink}
            submit={submit}
            today={today}
            modalHandleradd={modalHandleradd}
            updateInputValue={updateInputValue}
          />

          {isSkelton && <Skelton />}
          {!isSkelton && <NoRecordFound list={items} />}

          {items.map((item: any, index: number) => {
            return (
              <IonCard className="list-leave card-main" key={index}>
                <IonRow>
                  <IonCol size="8">
                    <div className="text-container-leave">
                      <div className="text">{"Date"}</div>
                      <div className={" number"}>
                        {item.date_from} - {item.date_to}
                      </div>
                    </div>
                  </IonCol>
                  <IonCol size="4" onClick={() => modalOpen(item)}>
                    <div
                      className={(item.updated_type || "Pending") + " status"}
                    >
                      <IonIcon
                        icon={
                          item.updated_type
                            ? item.updated_type == "Accept"
                              ? checkmarkCircleOutline
                              : closeCircleOutline
                            : reloadOutline
                        }
                      ></IonIcon>
                      <span> {item.updated_type || "Pending"} </span>
                    </div>
                  </IonCol>
                  <IonCol size="12">
                    <hr className="border" />
                  </IonCol>
                  <IonCol size="4">
                    <div className="text-container-leave text-left">
                      <div className="text">{"Applied day"}</div>
                      <div className={"number"}>
                        {dateDiffer(item.date_from, item.date_to)}
                      </div>
                    </div>
                  </IonCol>
                  <IonCol size="4">
                    <div className="text-container-leave text-center">
                      <div className="text">{"Leave Type"}</div>
                      <div className={"number"}>{item.leavetype || "--"}</div>
                    </div>
                  </IonCol>
                  <IonCol size="4">
                    <div className="text-container-leave text-right">
                      <div className="text">{"Approved By"}</div>
                      <div className={"number"}> {item.updated_by || "--"}</div>
                    </div>
                  </IonCol>
                </IonRow>
              </IonCard>
            );
          })}

          <IonInfiniteScroll
            disabled={isScroll}
            onIonInfinite={(ev) => {
              getList(page + 1);
              setTimeout(() => ev.target.complete(), 500);
            }}
          >
            <IonInfiniteScrollContent></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </div>
        <IonFab slot="fixed" vertical="bottom" horizontal="center">
          <IonFabButton onClick={() => addModalOpen()}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default LeaveList;
