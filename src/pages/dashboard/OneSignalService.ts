
import { isPlatform, useIonRouter } from '@ionic/react';
import OneSignal from 'onesignal-cordova-plugin';
import { apiCall } from '../../connect/api';
import secureLocalStorage from 'react-secure-storage';
export function OneSignalService() {
  const ionRouter = useIonRouter();
  const { call_secure_api } = apiCall();
  const startInitialize = (devideInfo:{}) => {
    // Check if the platform is running on Capacitor (Hybrid app)
    if (isPlatform("capacitor")) {
    
      // Initialize OneSignal with your App ID
      OneSignal.initialize("be5299dc-a67f-4000-8bd3-2ac5570862c4"); // Replace with your App ID
      OneSignal.Notifications.addEventListener('click', async (e) => {
        showNotification("notification");
      });
      OneSignal.Notifications.removeEventListener('click',function(e){
        console.log(e);
      })
      // Request notification permission from the user
      OneSignal.Notifications.requestPermission(true).then((success) => {
        //console.log("Notification permission granted: ", success);
      }).catch((error) => {
        console.error("Permission request error: ", error);
      });
      
      
      // Fetch the OneSignal user ID (Player ID)
      setTimeout(async () => {
        try {
          OneSignal.User.pushSubscription.addEventListener('change',function(e){
            if(typeof(e.current.id)=='string'){
              secureLocalStorage.setItem("one_token", e.current.id);
              saveFcmToken(e.current.id,devideInfo);
            }
          })         
        } catch (error) {
          console.error("Error fetching OneSignal User ID: ", error);
        }
      }, 500); // Adjust the timeout as needed to ensure OneSignal initialization is complete
    }
  }

  function showNotification(msg: any) {
    if (confirm(msg)) {
      ionRouter.push("notification");
    }
  }

  function saveFcmToken(fcmToken: any,devideInfo:{}) {
    // console.log(fcmToken,'fcmToken');
    call_secure_api("saveFcmToken", { tkn: fcmToken, device_info: devideInfo, oneToken:'oneToken' }).then(
      async (resolve: any) => {
        if (resolve.status === true) {
        } else {

        }
      },
      (reject: any) => {
      }
    );
  };
  return {
    startInitialize,
  };  
}

