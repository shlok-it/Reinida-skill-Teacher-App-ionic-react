import { useIonLoading } from "@ionic/react";

export function useLoader() {
    const [present, dismiss] = useIonLoading();
    
    const showLoader = (isOpen:boolean=true, message: string='Please wait',duration=2000) => {
        console.log(isOpen,'access')
        const data = {
            message: message,
            // duration: duration,
            isOpen:isOpen,
        }
       const presen = present(data);
    }
    return {
        showLoader ,
        dismiss
    };
}
