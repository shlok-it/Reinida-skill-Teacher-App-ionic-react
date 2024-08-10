import { IonImg } from "@ionic/react";
import { norecordfound } from "../connect/Images";
export const NoRecordFound = (props:any=[]) => {
  const steps = [];

   const iltm =(

                <div className="norecordfound">
                    <IonImg src={norecordfound}></IonImg>
                    <strong>No Record Found</strong>
                </div>
      );
    
      return (props.list.length==0&&<div className="">{iltm }</div>);
}