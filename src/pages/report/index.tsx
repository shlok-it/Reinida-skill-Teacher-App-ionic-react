import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  IonLabel,
  IonCard,
  useIonLoading,
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
  IonButton,
  IonSelectOption,
  IonSelect,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./index.scss";
import { useHistory } from "react-router";
import { ToolBar } from "../../components/ToolBar";
import BaseUrl from "../../connect/Config";
import ViewDetail from "./ViewDetail";
import {
  searchOutline,
} from "ionicons/icons";
import { Skelton } from "../../components/Skelton";
import { apiCall } from "../../connect/api";
import { formatTime, getYear, months } from "../../helper/general";
import { NoRecordFound } from "../../components/NoRecordFound";
import { UniqueItemList } from "../../hooks/useUniquData";
const Report: React.FC = () => {
  const {uniqueItem} =UniqueItemList();
  const { call_secure_get_api } = apiCall();
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [modalItem, setModalItem] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [refreshcount, setRefreshcount] = useState(1);
  const ionRouter = useIonRouter();
  const [items, setItems] = useState([]);
  const [isScroll, setIsScrollDisable] = useState(true);
  const [isSkelton, setIsSkelton] = useState(true);
  const perPage = 120;
  let page = 1;
  const date = new Date();
  const month = date.getMonth() + 1;
  const monthname: any = month > 9 ? month : 0 + "" + month;
  const year = date.getFullYear();
  const formdata = {
    year: year,
    month: monthname,
  };
const [values, setValues] = useState(formdata);
const [isSearch,setIsSearch ]= useState(0);
  useEffect(() => {
      setIsSkelton(false);
      // getAttendence(1);
      // setYearList(getYear());
      // setMonthList(months);
     
  }, [refreshcount,values.month,values.year]);

  const backButton: any = () => {
    ionRouter.goBack();
  };
  const searchFun = () => {
   setIsSearch(isSearch+1)
  };
  const updateInputValue = (event: any) => {
    setValues((oldValues) => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };
  const getAttendence = (pagenum = page, size = perPage) => {
    const search_key = values.year + "-" + values.month;
    call_secure_get_api(
      `attendence/list?page=${pagenum}&per_page=${size}&search_key=${search_key}&delay=1`
    ).then(
      async (resolve: any) => {
        setIsSkelton(false);
        if (resolve.status === true) {
            const item = resolve.data.data;
            setItems(item);
            setIsScrollDisable(true);
          page = pagenum;
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
  return (
    <IonPage className="">
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {/* button={true} */}
        <ToolBar title="Report"  />
        <ViewDetail
          isOpen={isOpen}
          item={modalItem}
          modalHandler={modalHandler}
        />
        {/* <IonCard>
          <IonList>
            <IonItem lines="none" className="SearchTab">
              <IonLabel>Month</IonLabel>
              <IonSelect
                aria-label="Month"
                placeholder="Month"
                name="month"
                value={values.month}
                onIonChange={(e) => updateInputValue(e)}
              >
                {monthList.map((item: any, index: number) => {
                  return (
                    <IonSelectOption key={index} value={item.key}>
                      {item.value}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
              <IonSelect
                aria-label="Year"
                name="year"
                placeholder="Year"
                value={values.year}
                onIonChange={(e) => updateInputValue(e)}
              >
                {yearList.map((item: any, index: number) => {
                  return (
                    <IonSelectOption key={index} value={item}>
                      {item}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>
          </IonList>
        </IonCard> */}

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
                      <span className={"number ps-3"}>{item.at_date}</span>
                    </div>
                  </div>
                  <hr className="border" />
                </IonCol>
                {item.at_detail &&
                  item.at_detail.map((data: any, i: number) => {
                    return (
                      <IonCol size="6" onClick={() => modalOpen(data)} key={i}>
                        <div
                          className={
                            data.phototype +
                            " d-flex justify-content-start align-items-center p-1 br-8"
                          }
                        >
                          <div>
                            <IonAvatar slot="start">
                              <IonImg
                                src={
                                  BaseUrl.resource_url + "/" + data.image_link
                                }
                              ></IonImg>
                            </IonAvatar>
                          </div>
                          <div className=" text-container-leave ps-3">
                            <div className="text">
                              {data.phototype ? "Check " + data.phototype : ""}
                            </div>
                            <div className={"number"}>
                              {formatTime(data.created_at)}
                            </div>
                          </div>
                        </div>
                      </IonCol>
                    );
                  })}
              </IonRow>
            </IonCard>
          );
        })}
        <IonInfiniteScroll
          disabled={isScroll}
          onIonInfinite={(ev) => {
            getAttendence(page + 1);
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Report;
