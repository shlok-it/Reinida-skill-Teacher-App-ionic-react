import { IonAvatar, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonLabel, IonLoading, IonPage, IonRow, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import BaseUrl from '../connect/Config';
import { apiCall } from "../connect/api";
const UserService = () => {
    const {call_secure_api } = apiCall();
    const [pageLoaded, setPageLoaded] = useState(false);
    const [member_list, setMemberData] = useState([]);
    const [errors, setErrors]: any = useState({});
    const history = useHistory();
    const { district_list, block_list, currentUser }: any = useStateContext();
    const [values, setValues] = useState({ state_code: currentUser.state_code, district_id: currentUser.district_id, block_id: currentUser.block_id });
    const goBackPreveius = () => {
        history.goBack();
    }
    useEffect(() => {
        setPageLoaded(false)
        get_member_data();
    }, [values])
    const get_member_data = () => {
        call_secure_api('member/list', values)
            .then(
                (resolve: any) => {
                    if (resolve.status === true) {
                        setMemberData(resolve.data.list || [])
                        setPageLoaded(true)
                    }
                    else {
                        setPageLoaded(true)
                    }
                },
                (reject) => {
                    setPageLoaded(true)
                }
            )
    }
    const compareWith = (o1: any, o2: any) => {
        return o1 == o2;
    };
    const updateInputValue = (event: any) => {
        setValues(oldValues => ({ ...oldValues, [event.target.name]: event.target.value }));
    };
    return (
        <IonPage>
            <IonContent fullscreen scrollY={true}>
                <div className="page-header">
                    <IonRow className='ion-align-items-center' style={{ paddingTop: '18px' }}>
                        <IonCol size='3' className='ion-text-left text-white fw-bold ps-3' onClick={() => goBackPreveius()}>
                            <IonIcon className='custom-back me-2' icon={arrowBack} />
                        </IonCol>
                        <IonCol size='9' className='ion-text-left pe-3'>
                            <IonLabel className='text-white'>Member Report</IonLabel>
                        </IonCol>
                    </IonRow>
                </div>
                <div className="ion-page-container member-report">
                    <IonCard className='ion-padding'>
                        <IonRow>
                            <IonCol size="6">
                                {errors && errors?.district_id && <p className="error">{errors.district_id[0]}</p>}
                                <IonSelect label="Select District" compareWith={compareWith} labelPlacement="stacked" placeholder="" value={values.district_id} name='district_id' onIonChange={updateInputValue}>
                                    {district_list.map((item: any, index: number) => {
                                        if (item.state_code == values.state_code) {
                                            return (
                                                <IonSelectOption key={index} value={item.id}>{item.name}</IonSelectOption>
                                            )
                                        }
                                    })}
                                </IonSelect>
                            </IonCol>
                            <IonCol size="6">
                                {errors && errors?.block_id && <p className="error">{errors.block_id[0]}</p>}
                                <IonSelect label="Select Block" compareWith={compareWith} labelPlacement="stacked" placeholder="" value={values.block_id} name='block_id' onIonChange={updateInputValue}>
                                    {block_list.map((item: any, index: number) => {
                                        if (item.district_id == values.district_id) {
                                            return (
                                                <IonSelectOption key={index} value={item.id}>{item.name}</IonSelectOption>
                                            )
                                        }
                                    })}
                                </IonSelect>
                            </IonCol>
                        </IonRow>
                        {pageLoaded === true ?
                            <IonGrid>
                                {member_list.map((item: any, index: number) => {
                                    return (<IonRow key={index} style={{ borderBottom: '1px solid #e3e3e3' }}>
                                        <IonCol size="3" className="ion-text-center" style={{ display: 'flex', alignItems: 'center' }}>
                                            <IonAvatar>
                                                <IonImg src={item.profile_base_url + item.profile_image}></IonImg>
                                            </IonAvatar>
                                        </IonCol>
                                        <IonCol size="9">
                                            <IonLabel className="fw-bolder text-dark">{item.full_name}</IonLabel>
                                            <p className="fs-12"><IonText className="fw-bolder">Reg. No.:</IonText>{item.reg_code}</p>
                                            <p className="d-flex fs-12 justify-content-between">
                                                <span><IonText className="fw-bolder">Mob. No.:</IonText>{item.mobile}</span>
                                                <span><IonText className="fw-bolder">BG:</IonText>{item.blood_group}</span>
                                            </p>
                                        </IonCol>
                                    </IonRow>
                                    )
                                })
                                }
                            </IonGrid>
                            :
                            <IonLoading
                                cssClass="my-custom-class"
                                isOpen={true}
                                message={'Please wait...'}
                                duration={5000}
                            />}
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    )
}
export default UserService;