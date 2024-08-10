import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonIcon, IonLabel, IonPage, IonRow, IonText, useIonAlert } from "@ionic/react"
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import { apiCall } from "../../connect/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../slices/thunk";
const PaymentForm = () => {
    const {call_secure_api } =apiCall()
    const history = useHistory();
    const { setCurrentUser }: any = useStateContext();
    const dispatch = useDispatch();
    const [reg_package, SetRegPackage]: any = useState(null);
    const [renew_package, SetRenewPackage]: any = useState(null);
    const [payment_mode, SetPaymentMode]: any = useState('');
    const [presentAlert] = useIonAlert();
    useEffect(() => {
        get_package_detail();
    }, [])
    const submit_registration = () => {
        if (payment_mode == '') {
            toast.error('Select payment mode');
        }
        else {
            call_secure_api('save-registration', { payment_mode: payment_mode, reg_package: reg_package?.id })
                .then(
                    (resolve: any) => {
                        if (resolve.status === true) {
                            presentAlert({
                                message: resolve.message,
                                buttons: ['OK']
                            })
                            dispatch(getUserProfile(setCurrentUser));
                            history.goBack();
                        }
                        else {
                            toast.error(resolve.message);
                        }
                    },
                    (reject) => {
                        toast.error('Error ! please try again later');
                    }
                )
        }
    }
    const get_package_detail = () => {
        call_secure_api('reg-plan')
            .then(
                (resolve: any) => {
                    if (resolve.status === true) {
                        SetRegPackage(resolve.data.reg_package || {});
                        SetRenewPackage(resolve.data.renew_package || {});
                    }
                    else {
                        SetRegPackage({});
                        SetRenewPackage({});
                    }
                },
                (reject) => {

                }
            )
    }
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="page-header">
                    <IonRow className='ion-align-items-center' style={{ paddingTop: '18px' }}>
                        <IonCol size='4' className='ion-text-left text-white fw-bold ps-3' onClick={() => history.goBack()}>
                            <IonIcon className='custom-back me-2' icon={arrowBack} />
                        </IonCol>
                        <IonCol size='8' className='ion-text-left text-white'>
                            <IonLabel>Payment Mode</IonLabel>
                        </IonCol>
                    </IonRow>
                </div>
                <div className="ion-page-container">
                    <IonCard className='ion-padding account-menu'>
                        <IonCardContent>
                            <IonLabel className='fw-bolder text-dark ion-text-center'>Payment Detail</IonLabel>
                            <IonRow className="ion-justify-content-center">
                                <IonCol size="5" className="">
                                    <IonLabel className='fw-bold'>Reg. Amount</IonLabel>
                                </IonCol>
                                <IonCol size="7" className="ion-text-right">
                                    {reg_package && <IonLabel>Rs.{reg_package.amount}</IonLabel>}
                                </IonCol>
                                <IonCol size="5" className="">
                                    <IonLabel className='fw-bold'>Validity</IonLabel>
                                </IonCol>
                                <IonCol size="7" className="ion-text-right">
                                    {reg_package && <IonLabel>{reg_package.validity_ext != 'LifeTime' ? reg_package.validity : ''}{reg_package.validity_ext}</IonLabel>}
                                </IonCol>
                                <IonCol size="5" className="">
                                    <IonLabel className='fw-bold'>Renewal Charge</IonLabel>
                                </IonCol>
                                <IonCol size="7" className="ion-text-right">
                                    {renew_package && <IonLabel>Rs.{renew_package.amount || '0'} {renew_package.amount && <IonText>({renew_package.validity_ext != 'LifeTime' ? renew_package.validity : ''}{renew_package.validity_ext || '---'})</IonText>}</IonLabel>}
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size="12" className="ion-text-center">
                                    <IonLabel color={'dark'}>Select Payment Method</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size="6" className="ion-text-center">
                                    <IonButton fill={payment_mode == 'online' ? "solid" : "outline"} onClick={() => SetPaymentMode('online')} color={'success'} shape="round" size="small">Online</IonButton>
                                </IonCol>
                                <IonCol size="6" className="ion-text-center">
                                    <IonButton fill={payment_mode == 'offline' ? "solid" : "outline"} onClick={() => SetPaymentMode('offline')} color={'danger'} shape="round" size="small">Offline</IonButton>
                                </IonCol>
                            </IonRow>
                            <IonRow className="mt-5">
                                <IonCol size="12" className="ion-text-center">
                                    <IonButton fill="solid" color={'tertiary'} onClick={() => submit_registration()}>Submit</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    )
}
export default PaymentForm;