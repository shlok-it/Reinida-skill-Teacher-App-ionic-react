import { IonButton, IonCol, IonContent, useIonLoading, IonPage, IonRow, useIonAlert, IonCard, IonLabel, IonIcon, useIonModal } from '@ionic/react';
import CustomField from '../../components/CustomField';
import { usePasswordFields } from '../../data/fields';
import { useEffect, useState } from 'react';
import { validateForm, getValues } from '../../data/utils';
import { useParams } from 'react-router';
import secureLocalStorage from 'react-secure-storage';
import { useHistory } from "react-router-dom";
import { arrowBack } from 'ionicons/icons';
import OtpModal from '../../components/OtpModal';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { apiCall } from '../../connect/api';
const ChangePassword = () => {
    const {call_secure_api } = apiCall();
    const [presentAlert] = useIonAlert();
    const [temp_reg_id, setTempRegId] = useState('');
    const [mobile, setMobile] = useState('');
    const [present2, dismiss2] = useIonModal(OtpModal, {
        onDismiss: (data: string, role: string) => dismiss2(data, role),
        resend_otp: (status: boolean) => { login() },
        submit_Otp: (otp: any) => { check_otp(otp) },
        mobile: mobile
    });
    const [present, dismiss] = useIonLoading();
    const params = useParams();
    const history = useHistory();
    const fields = usePasswordFields();
    const [errors, setErrors] = useState(false);
    const goBackPreveius = () => {
        history.goBack();
    }
    const openModal = () => {
        present2({
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
                if (ev.detail.role === 'confirm') {

                }
            }
        });
    }
    const login = () => {
        const errors = validateForm(fields);
        setErrors(errors);
        if (!errors.length) {
            let options = getValues(fields);
            present({
                message: 'Please Wait...',
            });
            call_secure_api('login/password', options)
                .then(
                    (resolve: any) => {
                        dismiss();
                        presentAlert({ header: 'Alert!', message: resolve.message, buttons: ['OK'] });
                        if (resolve.status === true) {
                            secureLocalStorage.removeItem("app_authenticated");
                            secureLocalStorage.removeItem("app_access_token");
                            history.replace('/login');
                            presentAlert({ header: 'Alert!', message: resolve.message, buttons: ['OK'] });
                        }
                        else {
                        }
                    },
                    (reject: any) => {
                        // console.log(reject);
                        presentAlert({ header: 'Alert!', message: "Server Error", buttons: ['OK'] });
                        dismiss();
                    }
                )
        }
    }
    const check_otp = (otp: any) => {
        let options = { otp: otp, temp_reg_id: temp_reg_id };
        present({
            message: 'Please Wait...',
        });
        call_secure_api('login/password/verify', options)
            .then(
                (resolve: any) => {
                    dismiss();
                    if (resolve.status === true) {
                        dismiss2();
                        presentAlert({ header: 'Success!', message: resolve.message, buttons: ['OK'] });
                        history.goBack();
                    }
                    else {
                        presentAlert({ header: 'Alert!', message: resolve.message, buttons: ['OK'] });
                    }
                },
                (reject: any) => {
                    console.log(reject);
                    presentAlert({ header: 'Alert!', message: "Server Error", buttons: ['OK'] });
                    dismiss();
                }
            )
    }
    useEffect(() => {
        return () => {
            fields.forEach(field => field.input.state.reset(""));
            setErrors(false);
        }
    }, [params]);
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="page-header">
                    <IonRow className='ion-align-items-center' style={{ paddingTop: '18px' }}>
                        <IonCol size='3' className='ion-text-left text-white fw-bold ps-3' onClick={() => goBackPreveius()}>
                            <IonIcon className='custom-back me-2' icon={arrowBack} />
                        </IonCol>
                        <IonCol size='9' className='ion-text-left pe-3'>
                            <IonLabel className='text-white'>Change Password</IonLabel>
                        </IonCol>
                    </IonRow>
                </div>
                <div className="ion-page-container login-signup-form">
                    <IonCard className="ion-padding">
                        <IonRow>
                            <IonCol size="12">
                                {fields.map((field, index) => {
                                    return <CustomField key={index} field={field} errors={errors} />;
                                })}
                                <IonButton className="custom-button" expand="block" onClick={login}>Submit</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ChangePassword;