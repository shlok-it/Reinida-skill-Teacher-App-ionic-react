import { IonButton, IonCol, IonIcon, IonInput, IonLabel, IonRow, IonSelect, IonSelectOption, useIonAlert, useIonLoading } from '@ionic/react';
import { calendarClearOutline, callOutline, mailOutline, personOutline } from "ionicons/icons";
import { useEffect, useState } from 'react';
import { apiCall } from '../../connect/api';

const KycPersonalDetail = ({ currentUser,nextTab }: any) => {
    const {call_secure_api } =apiCall()
    const [errors, setErrors]: any = useState({});
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const [values, setValues] = useState(currentUser);
    const updateInputValue = (event: any) => {
        setValues((oldValues: any) => ({ ...oldValues, [event.target.name]: event.target.value }));
    };
    useEffect(() => {
        setErrors([]);
    }, [values])
    const createAccount = () => {
        present({
            message: 'Please Wait...',
        });
        call_secure_api('update/kyc-detail', values)
            .then(
                (resolve: any) => {
                    dismiss();
                    if (resolve.status === true) {
                        //presentAlert({ header: 'Success!', message: resolve.message, buttons: ['OK'] });
                        nextTab(2);
                    }
                    else {
                        presentAlert({ header: 'Alert!', message: resolve.message, buttons: ['OK'] });
                        setErrors(resolve.data?.errors || {})
                    }
                },
                (reject: any) => {
                    console.log(reject);
                    presentAlert({ header: 'Alert!', message: "Server Error", buttons: ['OK'] });
                    dismiss();
                }
            )
    }
    return (
        <div className="login-signup-form ion-padding-top">
            <IonLabel className='fw-bolder text-dark pb-3'>Personal Detail</IonLabel>
            <IonRow className="">
                <IonCol size="12">
                    {errors && errors?.full_name && <p className="error">{errors.full_name[0]}</p>}
                    <IonInput labelPlacement="stacked" type='text' value={values.full_name} placeholder="Your name" name='full_name' onIonInput={updateInputValue}>
                        <IonIcon slot="start" icon={personOutline} aria-hidden="true"></IonIcon>
                    </IonInput>
                    {errors && errors?.mobile && <p className="error">{errors.mobile[0]}</p>}
                    <IonInput labelPlacement="stacked" type='tel' readonly disabled value={values.mobile} maxlength={10} min={0} placeholder="Your mobile number" name='mobile' onIonInput={updateInputValue}>
                        <IonIcon slot="start" icon={callOutline} aria-hidden="true"></IonIcon>
                    </IonInput>
                    {errors && errors?.email && <p className="error">{errors.email[0]}</p>}
                    <IonInput labelPlacement="stacked" type='email' value={values.email} placeholder="Your email id" name='email' onIonInput={updateInputValue}>
                        <IonIcon slot="start" icon={mailOutline} aria-hidden="true"></IonIcon>
                    </IonInput>
                    {errors && errors?.dob && <p className="error">{errors.dob[0]}</p>}
                    <IonInput labelPlacement="stacked" type='date' value={values.dob} placeholder="Your date of birth" name='dob' onIonInput={updateInputValue}>
                        <IonIcon slot="start" icon={calendarClearOutline} aria-hidden="true"></IonIcon>
                    </IonInput>
                    {errors && errors?.gender && <p className="error">{errors.gender[0]}</p>}
                    <IonSelect label="Gender" labelPlacement="fixed" value={values.gender} placeholder="Select gender" name='gender' onIonChange={updateInputValue}>
                        <IonSelectOption value="Male">Male</IonSelectOption>
                        <IonSelectOption value="Female">Female</IonSelectOption>
                        <IonSelectOption value="Other">Other</IonSelectOption>
                    </IonSelect>
                    {errors && errors?.blood_group && <p className="error">{errors.blood_group[0]}</p>}
                    <IonSelect label="Blood group" labelPlacement="fixed" value={values.blood_group} placeholder="Select blood group" name='blood_group' onIonChange={updateInputValue}>
                        <IonSelectOption value="O+">O+</IonSelectOption>
                        <IonSelectOption value="O-">O-</IonSelectOption>
                        <IonSelectOption value="A+">A+</IonSelectOption>
                        <IonSelectOption value="A-">A-</IonSelectOption>
                        <IonSelectOption value="B+">B+</IonSelectOption>
                        <IonSelectOption value="B-">B-</IonSelectOption>
                        <IonSelectOption value="AB+">AB+</IonSelectOption>
                        <IonSelectOption value="AB-">AB-</IonSelectOption>
                    </IonSelect>
                    {errors && errors?.merital_status && <p className="error">{errors.merital_status[0]}</p>}
                    <IonSelect label="Merital Status" labelPlacement="fixed" value={values.merital_status} placeholder="Select merital status" name='merital_status' onIonChange={updateInputValue}>
                        <IonSelectOption value="UnMarried">UnMarried</IonSelectOption>
                        <IonSelectOption value="Widow / Widower">Widow / Widower</IonSelectOption>
                        <IonSelectOption value="Divorced">Divorced</IonSelectOption>
                        <IonSelectOption value="Separated">Separated</IonSelectOption>
                    </IonSelect>
                    <IonButton className="custom-button" expand="block" onClick={createAccount}>Next</IonButton>
                </IonCol>
            </IonRow>
        </div>
    );
};

export default KycPersonalDetail;