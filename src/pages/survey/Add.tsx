import {
  IonButton,
  IonCard,
  IonCardTitle,
  IonCol,
  IonContent,
  IonInput,
  IonPage,
  IonRow,
  IonTextarea,
  IonLabel,
  IonItem,
  IonList,
  IonIcon,
  IonCardSubtitle,
  IonImg,
  IonSelectOption,
  IonSelect,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFab,
  IonFabButton,
} from "@ionic/react";
// import "./index.scss";
import { arrowUpCircleOutline, closeCircle } from "ionicons/icons";
import { useState } from "react";

const Add = () => {
const initialValues = {
no_of_boys:'',
no_of_girls:'',
no_of_teacher_male :'',
no_of_teacher_female :'',
school_start_class:'',
school_end_class :'',
subject_without_teacher :'',

no_of_class_rooms:'',
is_campus_sufficient_for_student:'',
is_campus_boundary:'',
campus_ground_type:'',
no_of_trees:'',
no_of_washroom:'',


}
/*
स्कूल में कितने छात्र और छात्राएं हैं?
How many boys and girls are there in the school?

स्कूल में कितने शिक्षक हैं ?
How many teachers are there in the school?
Male teacher / अध्यापक
Female teacher/ अध्यापिका
कौन सी कक्षा तक पढ़ाई होती है ?
Till which class is the study done?
from class
कक्षा से
to class
कक्षा तक
स्कूल में किन विषयों के शिक्षक नहीं हैं?
Which subjects in the school do not have teachers?

स्कूल में परिसर में कितनी कक्षाएं हैं?
How many classrooms does the school have on campus?
क्या स्कूल का परिसर छात्र-छात्राओं के लिए पर्याप्त है
Is the school campus  sufficient for the students?

//स्कूल की इमारत कैसी है, कच्ची या पक्की?
//What is the school building like, mud or concrete?



*/


  const [errors ,setErrors] = useState([]);
  const [values ,setValues] = useState([]);

  return (
    <IonPage >
      <IonHeader>
        <IonToolbar>
          <IonTitle>
              Leave Request
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent >
      
        {/* <IonCard className="ion-padding login-signup-form">
          <IonRow>
            <IonCol size="12" className="ion-text-center">
              <IonCardSubtitle>Leave Request</IonCardSubtitle>
            </IonCol>
          </IonRow>
          <div className="ion-padding-top">
            <div>
                <label>स्क ू ल र्ें ककतने छात्र एर्वं छात्राये है -</label>
              <IonInput
                type="date"
                value={values.date_from}
                fill="solid"
                placeholder="Start Date"
                name="date_from"
                label="From Date"
                labelPlacement="fixed"
                required={true}
                min={today}
                // max={this_month}
                onIonInput={(e) => updateInputValue(e)}
              ></IonInput>
            </div>
            {errors && errors?.date_from && (
              <p className="error">{errors.date_from[0]}</p>
            )}
          </div>
          <IonList>
            <IonItem lines="none">
              <IonInput
                type="date"
                value={values.date_to}
                placeholder="End Date"
                name="date_to"
                label="To Date"
                labelPlacement="fixed"
                required={true}
                min={values.date_from}
                // max={this_month}
                onIonInput={updateInputValue}
              ></IonInput>
              {errors && errors?.date_to && (
                <p className="error">{errors.date_to[0]}</p>
              )}
            </IonItem>
          </IonList>
          <IonList>
            <IonItem lines="none">
              <IonSelect
                value={values.leavetype}
                placeholder="End Date"
                name="leavetype"
                label="Select"
                labelPlacement="fixed"
                onIonChange={updateInputValue}
              >
                <IonSelectOption value={"CL"}>CL</IonSelectOption>
                <IonSelectOption value={"PL"}>PL</IonSelectOption>
               
              </IonSelect>
              {errors && errors?.leavetype && (
                <p className="error">{errors.leavetype[0]}</p>
              )}
            </IonItem>
          </IonList>
          <IonList>
            <IonItem lines="none">
              <IonTextarea
                value={values.detail}
                labelPlacement="stacked"
                label="Reason"
                placeholder="Enter Reason"
                name="detail"
                required={true}
                rows={2}
                autoGrow={true}
                onIonInput={updateInputValue}
              ></IonTextarea>
              {errors && errors?.detail && (
                <p className="error">{errors.detail[0]}</p>
              )}
            </IonItem>
          </IonList>
          <IonList>
            <IonItem lines="none" className="text-center">
              <IonLabel>
                <IonButton expand="block" fill="clear" className="file_btn" onClick={(e)=>uploadfun(e)}>
                <IonIcon icon={arrowUpCircleOutline} aria-label="none" slot="start"></IonIcon>
                   Upload Application
                </IonButton>
                
              </IonLabel>
            </IonItem>
                
          </IonList>
          <IonList>
            <IonItem lines="none" className="text-center">
              <IonLabel>
                <IonButton
                  className="custom-button"
                  expand="block"
                 
                >
                  Send request
                </IonButton>               
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCard> */}
      </IonContent>
    </IonPage>
  );
};

export default Add;
