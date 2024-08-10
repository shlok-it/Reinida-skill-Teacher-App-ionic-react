import { StatusBar,Style } from '@capacitor/status-bar';
import { isPlatform } from '@ionic/react';

export function userStatusBar() {
    const darkStatusBar=()=>{
        if (isPlatform("capacitor")) {
            StatusBar.setOverlaysWebView({ overlay: false });
            StatusBar.setStyle({ style: Style.Light});
            StatusBar.setBackgroundColor({ color: '#ecf2f2'});
        }
    }
    const lightStatusBar=()=>{
        if (isPlatform("capacitor")) {
            StatusBar.setOverlaysWebView({ overlay: false });
            StatusBar.setStyle({ style: Style.Dark});
            StatusBar.setBackgroundColor({ color: '#016d94'});
        }
    }

    return {
        lightStatusBar,
        darkStatusBar
    };
}
