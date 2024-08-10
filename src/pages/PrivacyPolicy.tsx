import { IonCol, IonContent, IonIcon, IonPage, IonRow, IonLabel, IonCard, IonLoading } from '@ionic/react';
import { arrowBack } from "ionicons/icons";
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import parse from 'html-react-parser';
import { apiCall } from '../connect/api';
const PrivacyPolicy = () => {
	const {call_get_api } = apiCall();
	const [pageLoaded, setPageLoaded] = useState(false);
	const [page_data, setPageData] = useState('');
	const history = useHistory();
	const goBackPreveius = () => {
		history.goBack();
	}
	useEffect(() => {
		get_page_data();
	}, [])
	const get_page_data = () => {
		call_get_api('setting/page?page_type=privacy')
			.then(
				(resolve: any) => {
					if (resolve.status === true) {
						setPageData(resolve.data.content || '')
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
	return (
		<IonPage>
			<IonContent fullscreen scrollY={true}>
				<div className="page-header">
					<IonRow className='ion-align-items-center' style={{ paddingTop: '18px' }}>
						<IonCol size='3' className='ion-text-left text-white fw-bold ps-3' onClick={() => goBackPreveius()}>
							<IonIcon className='custom-back me-2' icon={arrowBack} />
						</IonCol>
						<IonCol size='9' className='ion-text-left pe-3'>
							<IonLabel className='text-white'>Privacy Policy</IonLabel>
						</IonCol>
					</IonRow>
				</div>
				<div className="ion-page-container">
					<IonCard className='ion-padding'>
						{pageLoaded === true ?
							parse(page_data)
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
	);
};

export default PrivacyPolicy;