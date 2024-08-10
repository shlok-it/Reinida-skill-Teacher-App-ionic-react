import { useEffect, useState, } from 'react';
import { isPlatform } from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, ReverseOptions, Address } from '@capgo/nativegeocoder';
import { NativeSettings, AndroidSettings, IOSSettings } from 'capacitor-native-settings';
export function deviceLocation() {
    const [location, setDeviceLocation] = useState();

    const enableLocation = async() => {
        try {        
          const checkPermissions = await Geolocation.requestPermissions();
          if (checkPermissions && checkPermissions.location == 'granted') {
             getcCurrentPosition();
          } else if (checkPermissions && (checkPermissions.location != 'granted')) {
            if (confirm('Please allow location permission')) {
                if(!isPlatform('ios')){
                const ios = await NativeSettings.openIOS({
                  option: IOSSettings.App,
                });
                if (ios && ios.status) {
                  enableLocation();
                }
              } else {
                const androind = await NativeSettings.openAndroid({
                  option: AndroidSettings.ApplicationDetails,
                });
                if (androind && androind.status) {
                  enableLocation();
                }
              }
            }
          }
        } catch (error: any) {
          if (error.message == 'Location services are not enabled') {
            if (confirm('Please enable location')) {
              const isEnable = await NativeSettings.open({ optionAndroid: AndroidSettings.Location, optionIOS: IOSSettings.LocationServices, });
              if (isEnable && isEnable.status) {
                enableLocation();
              }
            }
          }
          // alert(error.message)
          // console.log('this. is erorr',error.message);
        }
      }
    
     const getcCurrentPosition=()=> {
        try {
          Geolocation.getCurrentPosition().then((coordinates)=>
        {
            let lat = coordinates.coords.latitude;
            let long = coordinates.coords.longitude;
            getnativegeoCoder(lat, long);
        });         
        } catch (error: any) {
          // alert(error.message);
          // console.log(error,'Geolocation')
        }
      }
     const getnativegeoCoder=(latitude: number, longitude: number) =>{
        try {
          let options:ReverseOptions= {
            useLocale: true,
            maxResults: 2,
            latitude:latitude,
            longitude:longitude,
          };
         NativeGeocoder.reverseGeocode(options).then((res:any)=>{
          setDeviceLocation(res.addresses[0])
         });
        } catch (error: any) {
          // console.log(error,'getnativegeoCoder');
        }
      }
    return {
        location,
        enableLocation
    };
}
