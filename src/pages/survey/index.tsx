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
    IonInput,
  } from "@ionic/react";
  import { useEffect, useRef, useState } from "react";
  import { toast } from "react-toastify";
//   import "./index.scss";
  import { useHistory } from "react-router";
  import { ToolBar } from "../../components/ToolBar";
  import BaseUrl from "../../connect/Config";
  import { downloadOutline, searchOutline } from "ionicons/icons";
  import { Skelton } from "../../components/Skelton";
  import { apiCall } from "../../connect/api";
  import { formatMonth } from "../../helper/general";
  import { NoRecordFound } from "../../components/NoRecordFound";
  import { Browser } from "@capacitor/browser";
  const Survery: React.FC = () => {
    const { call_secure_get_api } = apiCall();
    const [refreshcount, setRefreshcount] = useState(1);
    const ionRouter = useIonRouter();
    const [items, setItems] = useState<any>([]);
    const [isSkelton, setIsSkelton] = useState(true);
    const [salary_token, setSalary_token] = useState('');
    const this_month = formatMonth(
      new Date(new Date().setMonth(new Date().getMonth() - 1))
    );
    const [values, setValues] = useState(this_month);
    useEffect(() => {
      setIsSkelton(true);
      getList();
    }, [refreshcount,values]);
  
    const updateInputValue = (event: any) => {
      setValues(() => event.target.value);
    };
    const getList = () => {
      const month = values;
      call_secure_get_api(`salary/list?month=${month}`).then(
        async (resolve: any) => {
          if (resolve.status === true) {
            const items = resolve.data.item;
            setSalary_token(resolve.data.salary_token);
            setItems(items);
          } else {
            setItems([]);
            toast.error(resolve.message);
          }
          setIsSkelton(false);
        },
        (reject: any) => {
          toast.error("Server Error");
        }
      );
    };
    const download = () => {
      if(!salary_token){
          toast.error("your salary token is not generated");
          return false;
      }
      Browser.open({ url: BaseUrl.api_url+`salary/download-pdf?token_=${salary_token}`, toolbarColor: "#8cc037" })
      Browser.addListener('browserFinished', async () => {
        Browser.close();
      })
      Browser.removeAllListeners();
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
          <ToolBar title="Salary" />
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
              </IonItem>
            </IonList>
          </IonCard>
  
          {isSkelton && <Skelton />}
          {!isSkelton && <NoRecordFound list={items} />}
          {items && items.length>0? <IonCard className=" card-main">{          
              items.map((item: any, key: number) => {
                return (
                  <IonRow
                    className={
                      "row " + (item["value"] == "heading" ? "heading" : "")
                    }
                    key={key}
                  >
                    <IonCol>{item["name"]}</IonCol>
                    {item["value"] != "heading" && (
                      <IonCol>{item["value"]} </IonCol>
                    )}
                  </IonRow>
                );
              })}
              <div className="download-btn-container">
              <IonButton className="download_btn" onClick={(e)=>download()}>
                <IonIcon icon={downloadOutline} slot="start" ></IonIcon>
                Download Slip
                </IonButton>
              </div>
          </IonCard>:''}
        </IonContent>
      </IonPage>
    );
  };
  
  export default Survery;
  