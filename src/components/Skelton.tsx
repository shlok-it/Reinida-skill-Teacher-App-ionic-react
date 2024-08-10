import { IonItem, IonLabel, IonList, IonListHeader, IonSkeletonText, IonThumbnail } from "@ionic/react";

export const Skelton = () => {
  const steps = [];

   const iltm =(
               <IonList >
            <IonListHeader>
              <IonSkeletonText animated={true} style={{ width: '80px' }}></IonSkeletonText>
            </IonListHeader>
            <IonItem>
              <IonThumbnail slot="start">
                <IonSkeletonText animated={true}></IonSkeletonText>
              </IonThumbnail>
              <IonLabel>
                <h3>
                  <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
                </h3>
                <p>
                  <IonSkeletonText animated={true} style={{ width: '60%' }}></IonSkeletonText>
                </p>
                <p>
                  <IonSkeletonText animated={true} style={{ width: '30%' }}></IonSkeletonText>
                </p>
              </IonLabel>
            </IonItem>
          </IonList>     
      );
      for (let i = 1; i <= 10; i++) {
        steps.push(<div key={i}>{iltm}</div>);
      }
      return (<div className="">{ steps }</div>);
}