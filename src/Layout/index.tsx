import React, { useEffect, useState, useMemo } from "react";
import secureLocalStorage from "react-secure-storage";
import { useStateContext } from "../contexts/ContextProvider";
import { IonLoading, IonProgressBar, IonToast, useIonRouter } from "@ionic/react";
import { apiCall } from "../connect/api";
import {useLoader} from "../hooks/useLoader";
import {Alert} from "../hooks/Alert";
const Layout = (props: any) => {
  const { setCurrentUser, toast, setStateList, isAuthed, setDistrictList, setBlockList } =
    useStateContext();
    const {showLoader} =useLoader();
    const {simpleAlert} = Alert();
    const [pageLoaded, setPageLoaded] = useState(isAuthed);
    const _token = secureLocalStorage.getItem("app_access_token");
    // const [access_token,setAccessToken] = useState(_token);
    const ionRouter = useIonRouter();
    const {call_secure_api, call_secure_get_api } = apiCall();
  useEffect(() => {  
    if(!isAuthed){
      ionRouter.push("/login/", "root", "replace");
     }else{
      profiledata();
     }  
  }, [isAuthed]); 
  const checkSession=()=>{
    showLoader(true);
    call_secure_api("login/session").then(
      (resolve: any) => {
        if (resolve.status === true) {
          showLoader(false);
          // profiledata();
        } else {
          ionRouter.push("/login/", "root", "replace");
          showLoader(false);
        }
      },
      (reject: any) => {
        showLoader(false);
      }
    );
  }
  const profiledata=()=>{
    if (_token) {
      call_secure_api("profile").then(
        (resolve: any) => {
          if (resolve.status === true) {
            setCurrentUser(resolve.data.profile);
            setPageLoaded(true);
          } else {
            ionRouter.push("/login",'root','replace');
          }
        },
        (reject) => {
          ionRouter.push("/login",'root','replace');
        }
      );
    } else {
      ionRouter.push("/login",'root','replace');
    }
  }
  const load_options_data = () => {
    call_secure_get_api("get-options-data").then(
      (resolve: any) => {
        if (resolve.status === true) {
          setStateList(resolve.data.state_list || []);
          setDistrictList(resolve.data.district_list || []);
          setBlockList(resolve.data.block_list || []);
        }
      },
      (reject) => {}
    );
  };
  return (
    <React.Fragment>
      <IonToast
          isOpen={toast.isOpen}
          position="top"
          message={toast.message}
          keyboardClose={true}
          color={toast.color}
          duration={2000}
        ></IonToast>
      {pageLoaded === true ? (props.children) : 
      (<IonProgressBar type="indeterminate"></IonProgressBar>
      )}
    </React.Fragment>
  );
};

export default Layout;
