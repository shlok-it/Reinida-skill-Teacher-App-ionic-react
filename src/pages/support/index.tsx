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
  IonInfiniteScrollContent,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./index.scss";
import { ToolBar } from "../../components/ToolBar";
import { Skelton } from "../../components/Skelton";
import { apiCall } from "../../connect/api";
import { NoRecordFound } from "../../components/NoRecordFound";
import { help_and_support } from "../../connect/Images";
import { callOutline, locateOutline, mailOutline } from "ionicons/icons";

const Support: React.FC = () => {
  const [items, setItems] = useState<any>([]);
  const { call_secure_get_api } = apiCall();
  const [present, dismiss] = useIonLoading();
  const [isSkelton, setIsSkelton] = useState(true);
  const [refreshcount, setRefreshcount] = useState(1);
  useEffect(() => {
    dismiss();
    setIsSkelton(true);
    getList();
  }, [refreshcount]);

  const getList = () => {
    call_secure_get_api(`help_support`).then(
      async (resolve: any) => {
        setIsSkelton(false);
        if (resolve.status === true) {
          setItems(resolve.data.detail);
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
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="leave-header">
          <ToolBar title="Help & Support" button="true" />
        </div>
        <div className="leave-header-content">
          {isSkelton && <Skelton />}
          {!isSkelton && <NoRecordFound list={items} />}
          <IonCard className="list-leave card-main">
            <IonRow>
              <IonCol size="12">
                <div className="text-container-leave">
                  <div>
                    <IonImg src={help_and_support}></IonImg>
                  </div>
                </div>
                <hr className="border" />
              </IonCol>
            </IonRow>
          </IonCard>
          <IonCard className="list-leave card-main">
            {items &&
              items.map((item: any, index: number) => {
                return (
                  item.value && (
                    <IonItem color={"none"} key={index}>
                      <IonIcon
                        icon={
                          item.type == "location"
                            ? locateOutline
                            : item.type == "contact"
                            ? callOutline
                            : item.type == "mail"
                            ? mailOutline
                            : ""
                        }
                        slot="start"
                      />
                      <IonLabel>
                        {item.type != "location" ? (
                          <IonText>
                            <a
                              href={
                                (item.type == "contact" ? "tel:" : "mailto:") +
                                item.value
                              }
                            >
                              <strong>{item.value}</strong>
                              <p>{item.label}</p>
                            </a>
                          </IonText>
                        ) : (
                          <IonText>
                            <strong>{item.value}</strong>
                            <p>{item.label}</p>
                          </IonText>
                        )}
                      </IonLabel>
                    </IonItem>
                  )
                );
              })}
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Support;
