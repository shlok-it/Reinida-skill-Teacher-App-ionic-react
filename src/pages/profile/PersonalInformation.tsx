import {
  IonCol,
  IonContent,
  IonIcon,
  IonPage,
  IonRow,
  IonLabel,
  IonCard,
  useIonLoading,
  IonCardContent,
  IonCardSubtitle,
} from "@ionic/react";
import { arrowBack, createOutline } from "ionicons/icons";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import BaseUrl from "../../connect/Config";
import moment from "moment";
import { useHistory } from "react-router";
import { ToolBar } from "../../components/ToolBar";
const PersonalInformation = () => {
  const { currentUser }: any = useStateContext();
  const [present, dismiss] = useIonLoading();
  const history = useHistory();
  const keyval = [{ key: "" }];
  const [userDetails, setUserDetails] = useState(keyval);

  const userDetailesdata = () => {
    const generalInformation: {} = {
    "Registration number": currentUser.reg_code || "",
      full_name: currentUser.full_name || "",
      father_name: currentUser.father_name || "",
      "Date Of Birth": currentUser.dob || "",
      gender: currentUser.gender || "",
      "mobile Number": currentUser.mobile || "",
      "Alternate mobile": currentUser.mobile2 || "",
      email: currentUser.email || "",
      category: currentUser.category || "",
      blood_group: currentUser.blood_group || "",
      addhar_card_number: currentUser.addhar_card || "",
      pan_card_number: currentUser.pan_card || "",
      health_issues: currentUser.health_issues || "",
    };
    const currentAddress: {} = {
      address: currentUser.address || "",
      block: currentUser.block_name || "",
      district: currentUser.district_name || "",
      state: currentUser.state_name || "",
      pincode: currentUser.pincode || "",
    };
    const permanentAddress: {} = {
      address: currentUser.p_address || "",
      block: currentUser.p_block_name || "",
      district: currentUser.p_district_name || "",
      state: currentUser.p_state_name || "",
      pincode: currentUser.p_pincode || "",
    };
    const bankDetails: {} = {
        ac_h_name: currentUser.ac_h_name || "",
        bank_name: currentUser.bank_name || "",
        branch: currentUser.branch || "",
        ac_no: currentUser.ac_no || "",
        ifsc: currentUser.ifsc || "",
    };

    const gen: any = [];
    const ca: any = [];
    const per: any = [];
    const bankDetail: any = [];
    Object.entries(generalInformation).forEach(([key, value]) => {
      gen.push({ key, value });
    });
    Object.entries(permanentAddress).forEach(([key, value]) => {
        ca.push({ key, value });
    });
    Object.entries(currentAddress).forEach(([key, value]) => {
        per.push({ key, value });
    });
    Object.entries(bankDetails).forEach(([key, value]) => {
        bankDetail.push({ key, value });
    });
    const dataArray:any=Array(
        {title:'General Information',data:gen},
        {title:'Currnet Address', data:ca},
        {title:'Permanent Address', data:per},
        {title:'Bank Details', data:bankDetail}
    )
    setUserDetails(dataArray);
  };
  const replaceUnderScore = (myString: string) => {
    if(myString)
        return myString.replace(/_/g, " ");
     else 
     return '';
  };
  useEffect(() => {
    dismiss();
    userDetailesdata();
  }, []);

  return (
    <IonPage className="">
      <IonContent fullscreen>
        <div className="page-header">
          <ToolBar title="Personal Information" button="true" />
        </div>

        <div className="ion-page-container">
        {userDetails.map((item: any, index: number) => {
            return (
            <IonCard className="ion-padding profile-label" key={index}>
                <IonCardSubtitle className="fw-bolder text-dark">{item.title}</IonCardSubtitle>
                <IonCardContent>
                {/* <IonLabel className="fw-bolder text-dark"></IonLabel>                 */}
                {item.data&&item.data.map((dd: any, key: number) => {
                    return(<div key={key}>{dd.value&&<IonRow
                        
                        className="ion-justify-content-center"
                        >
                        <IonCol size="4" className="ion-text-capitalize">
                        <IonLabel>{replaceUnderScore(dd.key)}</IonLabel>
                        </IonCol>
                        <IonCol size="8" className="ion-text-right">
                            <IonLabel>{dd.value}</IonLabel>
                         </IonCol>
                  </IonRow>}</div>)
                })}
            </IonCardContent>
          </IonCard>)
          })}
      
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PersonalInformation;
