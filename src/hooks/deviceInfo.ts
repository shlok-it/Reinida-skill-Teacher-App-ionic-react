import { useState, } from 'react';
import { isPlatform } from '@ionic/react';
import { Device } from '@capacitor/device';
export function deviceInfo() {
    const [devideInfo, setDeviceInfo] = useState({});
    const [battryinfo, setBattryinfo] = useState({});
    const logDeviceInfo = async () => {
        if(isPlatform("hybrid")){
            const info = await Device.getInfo();
            setDeviceInfo(info)
        }
    };
    const logBatteryInfo = async () => {
        if(isPlatform("hybrid")){
            const info = await Device.getBatteryInfo();
            setBattryinfo(info);
        }
    };
    return {
        devideInfo,
        battryinfo,
        logDeviceInfo,
        logBatteryInfo
    };
}
