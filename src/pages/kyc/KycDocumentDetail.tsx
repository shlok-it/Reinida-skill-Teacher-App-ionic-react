import { IonButton, IonCol, IonIcon, IonImg, IonInput, IonLabel, IonRow, IonSelect, IonSelectOption, isPlatform, useIonActionSheet, useIonAlert, useIonLoading } from '@ionic/react';
import { cardOutline, imageOutline } from "ionicons/icons";
import { useEffect, useState } from 'react';

import { useStateContext } from '../../contexts/ContextProvider.js';
import { useHistory } from 'react-router-dom';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { base64FromPath } from '../../helper/general.js';
import { Filesystem } from '@capacitor/filesystem';
import { getUserProfile } from '../../slices/thunk.js';
import { useDispatch } from 'react-redux';
import { apiCall } from '../../connect/api.js';
const KycDocumentDetail = ({ currentUser, nextTab, disableBack,onUpdate }: any) => {
    const {call_secure_api } =apiCall()
    const [errors, setErrors]: any = useState({});
    const [present, dismiss] = useIonLoading();
    const { setCurrentUser } = useStateContext();
    const [presentAlert] = useIonAlert();
    const dispatch = useDispatch();
    const [presentAction] = useIonActionSheet();
    const history = useHistory()
    const [values, setValues] = useState(currentUser);
    const updateInputValue = (event: any) => {
        setValues((oldValues: any) => ({ ...oldValues, [event.target.name]: event.target.value }));
    };
    useEffect(() => {
        setValues((oldValues: any) => ({ ...oldValues, profile_image: values.profile_image ? (values.profile_base_url + values.profile_image) : '' }));
        setValues((oldValues: any) => ({ ...oldValues, driving_license: values.driving_license ? (values.profile_base_url + values.driving_license) : '' }));
    }, [])
    useEffect(() => {
        setErrors([]);
    }, [values])

    const createAccount = () => {
        present({
            message: 'Please Wait...',
        });
        call_secure_api('update/kyc-document', values)
            .then(
                (resolve: any) => {
                    dismiss();
                    if (resolve.status === true) {
                        //presentAlert({ header: 'Success!', message: resolve.message, buttons: ['OK'] });
                        dispatch(getUserProfile(setCurrentUser));
                        history.replace("/dashboard");
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
    const pick_image = (document_type: string) => {
        presentAction({
            header: 'Choose Image From',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: () => {
                        openCamera(document_type);
                    },
                },
                {
                    text: 'Gallery',
                    icon: 'images',
                    handler: () => {
                        openGallery(document_type);
                    },
                },
                {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => { },
                },
            ],
        });
    }
    const openCamera = async (document_type: string) => {
        const image = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            saveToGallery: false,
            source: CameraSource.Camera,
            resultType: CameraResultType.Base64,
        });
        var imageUrl = image.base64String;
        if (imageUrl) {
            let newPic = 'data:image/' + image.format + ';base64,' + imageUrl;
            setValues((oldValues: any) => ({ ...oldValues, [document_type]: newPic }));
        }
        else {
            setValues((oldValues: any) => ({ ...oldValues, [document_type]: '' }));
        }
    }

    const openGallery = async (document_type: string) => {
        const imageUrl = await Camera.pickImages({
            quality: 100,
        });
        if (imageUrl && imageUrl.photos) {
            var base64Data: any;
            if (isPlatform('hybrid')) {
                const file = await Filesystem.readFile({
                    path: imageUrl.photos[0].path!,
                });
                base64Data =
                    'data:image/' + imageUrl.photos[0].format + ';base64,' + file.data;
            } else {
                base64Data = await base64FromPath(
                    imageUrl.photos[0].webPath!
                );
            }
            setValues((oldValues: any) => ({ ...oldValues, [document_type]: base64Data }));
        }
        else {
            setValues((oldValues: any) => ({ ...oldValues, [document_type]: '' }));
        }
    }
    return (
        <div className="login-signup-form ion-padding-top">
            <IonLabel className='fw-bolder text-dark'>Document Detail</IonLabel>
            <IonRow className="">
                <IonCol size='12'>
                    {errors && errors?.vehicle_type && <p className="error">{errors.vehicle_type[0]}</p>}
                    <IonSelect label="Vehile Type" compareWith={compareWith} labelPlacement="fixed" value={values.vehicle_type} placeholder="Select vehile Type" name='vehicle_type' onIonChange={updateInputValue}>
                        <IonSelectOption value="Truck">Truck</IonSelectOption>
                        <IonSelectOption value="Bus">Bus</IonSelectOption>
                        <IonSelectOption value="Auto">Auto</IonSelectOption>
                        <IonSelectOption value="Taxi">Taxi</IonSelectOption>
                        <IonSelectOption value="Other">Other</IonSelectOption>
                    </IonSelect>
                </IonCol>
            </IonRow>
            <IonRow className="">
                <IonCol size='12'>
                    {errors && errors?.driving_license_number && <p className="error">{errors.driving_license_number[0]}</p>}
                    <IonInput labelPlacement="stacked" type='text' value={values.driving_license_number} placeholder="Driving License Number" name='driving_license_number' onIonInput={updateInputValue}>
                        <IonIcon slot="start" icon={cardOutline} aria-hidden="true"></IonIcon>
                    </IonInput>
                </IonCol>
            </IonRow>
            <IonRow className="">
                <IonCol size='12'>
                    <IonLabel className='fw-bolder text-dark'>Passport Size Photo</IonLabel>
                    {errors && errors?.profile_image && <p className="error">{errors.profile_image[0]}</p>}
                    <div className="dropzone" onClick={() => pick_image('profile_image')}>
                        {!values?.profile_image && <>
                            <IonIcon icon={imageOutline} />
                            <IonLabel>Upload Passport Size Photo</IonLabel>
                        </>}
                        {values?.profile_image && <>
                            <IonImg src={values?.profile_image} />
                        </>}
                    </div>
                </IonCol>
            </IonRow>
            <IonRow className="">
                <IonCol size='12'>
                    <IonLabel className='fw-bolder text-dark'>Driving License</IonLabel>
                    {errors && errors?.driving_license && <p className="error">{errors.driving_license[0]}</p>}
                    <div className="dropzone" onClick={() => pick_image('driving_license')}>
                        {!values?.driving_license && <>
                            <IonIcon icon={imageOutline} />
                            <IonLabel>Upload Driving License</IonLabel>
                        </>}
                        {values?.driving_license && <>
                            <IonImg src={values?.driving_license} />
                        </>}
                    </div>
                </IonCol>
            </IonRow>
            {!disableBack && <IonRow>
                <IonCol className='ion-text-center' size='6'>
                    <IonButton className="custom-button" expand="block" onClick={() => nextTab(2)}>Back</IonButton>
                </IonCol>
                <IonCol className='ion-text-center' size='6'>
                    <IonButton className="custom-button" expand="block" onClick={createAccount}>Submit</IonButton>
                </IonCol>
            </IonRow>}
            {disableBack && (currentUser.kyc_status == 2 || currentUser.kyc_status == 1) && <IonRow>
                <IonCol className='ion-text-center' size='12'>
                    <IonButton className="custom-button" expand="block" onClick={createAccount}>Submit</IonButton>
                </IonCol>
            </IonRow>}
        </div>
    );
};

export default KycDocumentDetail;