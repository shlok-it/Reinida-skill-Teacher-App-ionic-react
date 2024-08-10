import { useIonRouter } from '@ionic/react';
export function appbackroute() {
    const ionRouter = useIonRouter();
    const Backbutton = () => {
        ionRouter.goBack();
    }
    const gotoUrl = (url: string) => {
        ionRouter.push(url);
    }
    return {
        Backbutton,
        gotoUrl
    }
}
