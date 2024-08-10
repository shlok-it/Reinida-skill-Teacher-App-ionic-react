import { IonButton, IonCol, IonIcon, IonInput, IonLabel, IonRow, IonSelect, IonSelectOption, IonTextarea, useIonAlert, useIonLoading } from '@ionic/react';
import { locationOutline } from "ionicons/icons";
import { useEffect, useState } from 'react';

import { useStateContext } from '../../contexts/ContextProvider.js';
import { apiCall } from '../../connect/api.js';
const KycAddressDetail = ({ currentUser, nextTab }: any) => {
    const {call_secure_api } =apiCall()
    const [errors, setErrors]: any = useState({});
    const [present, dismiss] = useIonLoading();
    const { district_list, block_list, state_list } = useStateContext();
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
        call_secure_api('update/kyc-address', values)
            .then(
                (resolve: any) => {
                    dismiss();
                    if (resolve.status === true) {
                        //presentAlert({ header: 'Success!', message: resolve.message, buttons: ['OK'] });
                        nextTab(3);
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
    const compareWith = (o1: any, o2: any) => {
        return o1 == o2;
    };
    return (
        <div className="login-signup-form ion-padding-top">
            <IonLabel className='fw-bolder text-dark'>Address Detail</IonLabel>
            <IonRow className="">
                <IonCol size='12'>
                    {errors && errors?.state_code && <p className="error">{errors.state_code[0]}</p>}
                    <IonSelect label="State" compareWith={compareWith} labelPlacement="fixed" placeholder="Select State" value={values.state_code} name='state_code' onIonChange={updateInputValue}>
                        {state_list.map((item: any, index) => {
                            return (
                                <IonSelectOption key={index} value={item.state_code}>{item.name}</IonSelectOption>
                            )
                        })}
                    </IonSelect>
                    {errors && errors?.district_id && <p className="error">{errors.district_id[0]}</p>}
                    <IonSelect label="District" compareWith={compareWith} labelPlacement="fixed" placeholder="Select District" value={values.district_id} name='district_id' onIonChange={updateInputValue}>
                        {district_list.map((item: any, index) => {
                            if (item.state_code == values.state_code) {
                                return (
                                    <IonSelectOption key={index} value={item.id}>{item.name}</IonSelectOption>
                                )
                            }
                        })}
                    </IonSelect>
                    {errors && errors?.block_id && <p className="error">{errors.block_id[0]}</p>}
                    <IonSelect label="Block" compareWith={compareWith} labelPlacement="fixed" placeholder="Select Block" value={values.block_id} name='block_id' onIonChange={updateInputValue}>
                        {block_list.map((item: any, index) => {
                            if (item.district_id == values.district_id) {
                                return (
                                    <IonSelectOption key={index} value={item.id}>{item.name}</IonSelectOption>
                                )
                            }
                        })}
                    </IonSelect>
                    {errors && errors?.pincode && <p className="error">{errors.pincode[0]}</p>}
                    <IonInput labelPlacement="stacked" type='tel' value={values.pincode} maxlength={6} min={0} placeholder="Your pincode" name='pincode' onIonInput={updateInputValue}>
                        <IonIcon slot="start" icon={locationOutline} aria-hidden="true"></IonIcon>
                    </IonInput>
                    {errors && errors?.address && <p className="error">{errors.address[0]}</p>}
                    <IonTextarea labelPlacement="stacked" value={values.address||''} placeholder="Full adrress" name='address' onIonInput={updateInputValue}>
                        <IonIcon slot="start" icon={locationOutline} aria-hidden="true"></IonIcon>
                    </IonTextarea>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol className='ion-text-center' size='6'>
                    <IonButton className="custom-button" expand="block" onClick={() => nextTab(1)}>Back</IonButton>
                </IonCol>
                <IonCol className='ion-text-center' size='6'>
                    <IonButton className="custom-button" expand="block" onClick={createAccount}>Next</IonButton>
                </IonCol>
            </IonRow>
        </div>
    );
};

export default KycAddressDetail;