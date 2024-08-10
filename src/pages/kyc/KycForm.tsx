import { IonCol, IonContent, IonIcon, IonPage, IonRow, IonLabel, useIonLoading, IonHeader, IonButton } from '@ionic/react';
import { arrowBack, documentTextOutline, locationOutline, personOutline } from "ionicons/icons";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import KycPersonalDetail from './KycPersonalDetail';
import KycAddressDetail from './KycAddressDetail';
import KycDocumentDetail from './KycDocumentDetail';
const KycForm = () => {
    const { currentUser }: any = useStateContext();
    const history = useHistory();
    const [present, dismiss] = useIonLoading();
    const [current_tab, setCurrentTab] = useState(history.location?.state?.newTab || 1);
    const [disableBack, setDisableBack] = useState(history.location?.state?.disableBack || false);
    useEffect(() => {
        dismiss();
    }, [])
    const goBackPreveius = () => {
        history.goBack();
    }
    const switch_tab = (tab: number) => {
        setCurrentTab(tab);
    }
    return (
        <IonPage className=''>
            <IonHeader className='py-2'>
                <IonRow className='ion-align-items-center'>
                    <IonCol size='4' className='ion-text-left text-black fw-bold ps-3' onClick={() => goBackPreveius()}>
                        <IonIcon className='custom-back me-2' icon={arrowBack} />
                    </IonCol>
                    <IonLabel className='fw-bolder'>Kyc Form</IonLabel>
                </IonRow>
            </IonHeader>
            <IonContent fullscreen>
                <div className="kyc-form-container">
                    <div className='ion-padding'>
                        <IonRow className='kyc-tab-section'>
                            <IonCol size='4' className='ion-text-center'>
                                <IonButton className={'kyc-tab-button ' + (current_tab == 1 ? 'active' : '')}>
                                    <IonIcon icon={personOutline}></IonIcon>
                                </IonButton>
                                <IonLabel>Personal Detail</IonLabel>
                            </IonCol>
                            <IonCol size='4' className='ion-text-center'>
                                <IonButton className={'kyc-tab-button ' + (current_tab == 2 ? 'active' : '')}>
                                    <IonIcon icon={locationOutline}></IonIcon>
                                </IonButton>
                                <IonLabel>Address Detail</IonLabel>
                            </IonCol>
                            <IonCol size='4' className='ion-text-center'>
                                <IonButton className={'kyc-tab-button' + (current_tab == 3 ? 'active' : '')}>
                                    <IonIcon icon={documentTextOutline}></IonIcon>
                                </IonButton>
                                <IonLabel>Document Detail</IonLabel>
                            </IonCol>
                        </IonRow>
                        {current_tab == 1 && <KycPersonalDetail nextTab={switch_tab} currentUser={currentUser} />}
                        {current_tab == 2 && <KycAddressDetail nextTab={switch_tab} currentUser={currentUser} />}
                        {current_tab == 3 && <KycDocumentDetail disableBack={disableBack} nextTab={switch_tab} currentUser={currentUser} />}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default KycForm;