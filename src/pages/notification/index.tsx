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
import "./index.scss";
import { ToolBar } from "../../components/ToolBar";
import BaseUrl from "../../connect/Config";
import { Skelton } from "../../components/Skelton";
import { apiCall } from "../../connect/api";
import { formatMonth, formatDateTime } from "../../helper/general";
import { NoRecordFound } from "../../components/NoRecordFound";
import { UniqueItemList } from "../../hooks/useUniquData";
import { useStateContext } from "../../contexts/ContextProvider";
const Notifications: React.FC = () => {
  const { call_secure_get_api } = apiCall();
  const [modalItem, setModalItem] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [refreshcount, setRefreshcount] = useState(1);
  const ionRouter = useIonRouter();
  const [items, setItems] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [colName, setColName] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [search_key, setSearch_key] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { call_secure_api } = apiCall();
  const { uniqueItem } = UniqueItemList();
  const [isSkelton, setIsSkelton] = useState(true);
  const [isScroll, setIsScrollDisable] = useState(true);
  const {  setNotificationCount}: any = useStateContext();
  useEffect(() => {
    setIsSkelton(true);
    getList();
  
  }, [refreshcount]);

  const backButton: any = () => {
    ionRouter.goBack();
  };
 
  const getList = (
    pagenum = page,
    size = perPage,
    col = colName,
    sort = sortBy
  ) => {
    call_secure_get_api(
      `notification/list?page=${pagenum}&per_page=${size}&colName=${col}&sortBy=${sort}&search_key=${search_key}&delay=1`
    ).then(
      async (resolve: any) => {
        setIsSkelton(false);
        if (resolve.status === true) {
          
          if (resolve.data.data.length > 0) {
            const item: any = items.concat(resolve.data.data);
            const uniqueItems = uniqueItem(item);
            setItems(uniqueItems);
            setIsScrollDisable(false);
            setNotificationCount(0)
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
        <ToolBar title="Notification" button={true}/>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {isSkelton && <Skelton />}
        {!isSkelton && <NoRecordFound list={items} />}
        {items.map((item: any, index: number) => {
          return (
            <IonCard className="list-leave card-main" key={index}>
              <IonRow>
                  <IonCol size="12" className="leave_bg">
                    {item.title ? (
                      <strong>{item.title}</strong>
                    ) : (
                      ""
                    )}
                    {item.notification_text ? (
                      <div>{item.notification_text}</div>
                    ) : (
                      ""
                    )}
                  </IonCol>
                <IonCol size="12">
                  <div className="text-container-leave">
                    <div>
                      {"Date"}
                      <span className={"number ps-3"}>
                       {formatDateTime(item.send_at,'date')}
                      </span>
                    </div>
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
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
