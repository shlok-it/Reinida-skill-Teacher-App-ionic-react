import { IonCol, IonLabel, IonRouterLink, IonRow } from "@ionic/react";

export const Action = (props:any) => (

    <IonRow className="ion-text-center ion-justify-content-center">
        <IonCol size="12">
            <IonLabel className="fs-16 mt-2">
                { props.message }
                <IonRouterLink className="custom-link" routerLink={ props.link }> { props.text } &rarr;</IonRouterLink>
            </IonLabel>
        </IonCol>
    </IonRow>
);