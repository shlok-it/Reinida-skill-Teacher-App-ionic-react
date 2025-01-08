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
    IonGrid,
} from "@ionic/react";
// import "./index.scss";
import { arrowUpCircleOutline, closeCircle } from "ionicons/icons";
import { useEffect, useId, useState } from "react";
import { apiCall } from "../../connect/api";
import { toast } from "react-toastify";

const Add = () => {
    const { call_secure_get_api } = apiCall();
    const userid = useId();
    const initialValues = {
        no_of_boys: '',
        no_of_girls: '',
        no_of_teacher_male: '',
        no_of_teacher_female: '',
        school_start_class: '',
        school_end_class: '',
        subject_without_teacher: '',

        no_of_class_rooms: '',
        is_campus_sufficient_for_student: '',
        is_campus_boundary: '',
        campus_ground_type: '',
        no_of_trees: '',
        no_of_washroom: '',


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


    const [errors, setErrors] = useState({});
    const [values, setValues] = useState(initialValues);
    const [inputFled, setInputFled] = useState([]);

    useEffect(() => {
        getList()
    }, []);

    const getList = () => {
        const month = values;
        call_secure_get_api(`survey/inputfileds`).then(
            async (resolve: any) => {
                if (resolve.status === true) {
                    setInputFled(resolve.data);
                } else {
                    setInputFled([]);
                    toast.error(resolve.message);
                }
            },
            (reject: any) => {
                toast.error("Server Error");
            }
        );
    };
    return (
        <IonPage >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        School Survey Form
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent >
                <IonGrid>
                    <IonRow>
                        {inputFled && inputFled.map((item: any, key: number) => {
                            return (
                                <IonCol size={"12"} key={key}>
                                    {(item?.header) ? <div  className={item.headerClass}>{item.header}
                                        <br />
                                        {item.headerHindi}
                                        </div>
                                       :
                                        <div  className="ion-padding-top">
                                            <div className="form-group">
                                                <label htmlFor={item.label}>{item.label}</label><br />
                                                <label htmlFor={item.labelHindi}>{item.labelHindi}</label>
                                                <IonInput
                                                    id={userid + item?.name}
                                                    type={item?.type}
                                                    fill="solid"
                                                    className="form-control"
                                                    value={item?.value}
                                                    name={item?.name}
                                                    required={item?.required}
                                                />
                                                {/* {errors && errors?.no_of_boys && (
                                                    <p className="error">{errors?.no_of_boys}
                                                    </p>)} */}
                                            </div>
                                        </div>}
                                </IonCol>)
                        })}
                    </IonRow>

                </IonGrid>



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

            </IonContent>
        </IonPage>
    );
};

export default Add;
