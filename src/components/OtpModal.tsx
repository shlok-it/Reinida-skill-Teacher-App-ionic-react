import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    IonButton,
    IonContent,
    IonPage,
    IonInput,
    IonRow,
    IonCol,
    IonIcon,
    IonLabel,
    IonCard,
    IonCardTitle,
    useIonToast,
} from '@ionic/react';
import { arrowBack, pinOutline } from 'ionicons/icons';

const OtpModal = ({
    onDismiss,
    resend_otp,
    mobile,
    submit_Otp,
}: {
    onDismiss: (data?: string | null | undefined | number, role?: string) => void;
    submit_Otp: (otp?: string | null | undefined | number) => void;
    resend_otp: (status: boolean) => void;
    mobile: string | null | undefined | number
}) => {
    const [present] = useIonToast();
    const [intervalTime, SetIntervalTime] = useState(30);
    const [values, setValues] = useState({
        otp: '',
        mobile: mobile
    });
    useEffect(() => {
        startTimer();
    }, [])
    const intervalIDRef: any = useRef(null);

    const startTimer = useCallback(() => {
        SetIntervalTime(30);
        clearInterval(intervalIDRef.current);
        intervalIDRef.current = null;
        intervalIDRef.current = setInterval(() => {
            SetIntervalTime(prev => prev - 1);
            if (intervalTime < 0) {
                clearInterval(intervalIDRef.current);
            }
        }, 1000);
    }, []);
    const updateInputValue = (event: any) => {
        setValues(oldValues => ({ ...oldValues, [event.target.name]: event.target.value }));
    };
    const createAccount = () => {
        if (values.otp.toString().length != 6) {
            present({ message: 'Please enter 6 digit otp', position: 'top', duration: 1500 });
        }
        else {
            submit_Otp(values.otp)
        }
    }
    return (
        <IonPage>
            <IonContent>
                <div className="login-signup-verification-header">
                    <IonRow className='ion-padding-top'>
                        <IonCol onClick={() => onDismiss(null, 'cancel')} size='6' className='ion-text-left text-white fw-bold ps-3'>
                            <IonIcon className='custom-back me-2' icon={arrowBack} />
                            <IonLabel>Back</IonLabel>
                        </IonCol>
                    </IonRow>
                </div>
                <div className="ion-otp-container login-signup-form">
                    <IonCard className="ion-padding">
                        <IonRow>
                            <IonCol size="12" className="ion-text-center">
                                <IonCardTitle>Verify Mobile</IonCardTitle>
                                <h5>6-digit OTP send to {values.mobile}</h5>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-padding-top">
                            <IonCol size="12">
                                <IonInput labelPlacement="stacked" type='tel' value={values.otp} maxlength={6} min={0} placeholder="Enter otp" name='otp' onIonInput={updateInputValue}>
                                    <IonIcon slot="start" icon={pinOutline} aria-hidden="true"></IonIcon>
                                </IonInput>
                                <IonButton className="custom-button" expand="block" onClick={createAccount}>Submit</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-padding-top ion-text-center">
                            <IonCol size="12">
                                <IonLabel className="ion-no-margin"
                                >You didn't recieve the otp ?
                                    {intervalTime <= 0 && <span className='text-danger' onClick={() => { resend_otp(true); startTimer(); }}>Resend OTP</span>}
                                    {intervalTime > 0 && <>
                                        <br />
                                        <span>Resend in {intervalTime}sec</span>
                                    </>}
                                </IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};
export default OtpModal;