import { IonLoading } from "@ionic/react";

const Loader= (Props:any) => {
   return( <IonLoading
    cssClass="my-custom-class"
    isOpen={Props.loading}
    message={Props.message||"Please wait..."}
  />)
}
export default Loader