import { useIonAlert } from "@ionic/react";

export function Alert() {
    const [presentAlert] = useIonAlert();
    let isConfirm = false;
    const simpleAlert = (header: string = 'Alert', message: string) => {
        const data = {
            header: header,
            message: message,
            buttons: ["OK"]
        }
        presentAlert(data);
    }
    const confirm = (header: string = 'Alert', message: string) => {
        const data = {
            header: header,
            message: message,
            buttons: [
                {
                    text: "No",
                    cssClass: "alert-button-cancel",
                    handler:()=> false
                },
                {
                    text: "Yes",
                    cssClass: "alert-button-confirm",
                    handler:()=> true
                },]

        }
        return presentAlert(data);
    }


    return {
        simpleAlert,
        confirm,
        isConfirm,
    };
}
