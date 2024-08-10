import { IonCol, IonContent, IonIcon, IonPage, IonRow, IonLabel, IonCard, useIonLoading, IonCardContent, IonImg } from '@ionic/react';
import { arrowBack, createOutline, imageOutline } from "ionicons/icons";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from 'react';
import BaseUrl from '../../connect/Config';
import { useHistory } from 'react-router-dom';
const DocumentDetail = () => {
    const { currentUser }: any = useStateContext();
    const [present, dismiss] = useIonLoading();
    const history = useHistory();
    useEffect(() => {
        dismiss();
    }, [])
    const goBackPreveius = () => {
        history.goBack();
    }
    const goKycPage = () => {
        history.push('/kyc-form', { newTab: 3, disableBack: true });
    }
    return (
        <IonPage className=''>
            <IonContent fullscreen>
                <div className="page-header">
                    <IonRow className='ion-align-items-center' style={{ paddingTop: '18px' }}>
                        <IonCol size='6' className='ion-text-left text-white fw-bold ps-3' onClick={() => goBackPreveius()}>
                            <IonIcon className='custom-back me-2' icon={arrowBack} />
                            <IonLabel>Back</IonLabel>
                        </IonCol>
                        <IonCol size='6' className='ion-text-right pe-3'>
                            {(currentUser.kyc_status == 2 || currentUser.kyc_status == 0) && <IonIcon onClick={() => goKycPage()} icon={createOutline} className='home-header-icon' />}
                        </IonCol>
                    </IonRow>
                </div>
                <div className="ion-page-container">
                    <IonCard className='ion-padding account-menu'>
                        <IonCardContent>
                            <IonLabel className='fw-bolder text-dark'>Document Detail</IonLabel>
                            <IonRow className="ion-justify-content-center">
                                <IonCol size="4" className="">
                                    <IonLabel className='fw-bold'>Vehical Type</IonLabel>
                                </IonCol>
                                <IonCol size="8" className="ion-text-right">
                                    <IonLabel>{currentUser.vehicle_type}</IonLabel>
                                </IonCol>
                                <IonCol size="4" className="">
                                    <IonLabel className='fw-bold'>DL No.</IonLabel>
                                </IonCol>
                                <IonCol size="8" className="ion-text-right">
                                    <IonLabel>{currentUser.driving_license_number || '---'}</IonLabel>
                                </IonCol>
                                <IonCol size="12" className="">
                                    <IonLabel className='text-dark fw-bold'>Driving License</IonLabel>
                                    <div className='dropzone'>
                                        {currentUser.driving_license && <IonImg src={BaseUrl.resource_url + currentUser.driving_license}></IonImg>}
                                        {!currentUser.driving_license && <IonIcon icon={imageOutline} />}
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default DocumentDetail;