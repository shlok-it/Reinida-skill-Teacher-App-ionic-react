import {
  IonButton,
  IonCol,
  IonContent,
  IonImg,
  IonPage,
  IonRouterLink,
  IonRow,
  IonSpinner,
} from "@ionic/react";
import { logo } from "../../connect/Images";
import secureLocalStorage from "react-secure-storage";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./home.scss";
import { apiCall } from "../../connect/api";
const Home = () => {
  const { call_get_api } = apiCall();
  const history = useHistory();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [brandLogo, setBrandLogo] = useState([]);
  useEffect(() => {
    const authenticated = secureLocalStorage.getItem("app_authenticated");
    if (authenticated) {
      const access_token = secureLocalStorage.getItem("app_access_token");
      if (access_token) {
        history.push("/tabs/");
      } else {
        setPageLoaded(true);
      }
    } else {
      setPageLoaded(true);
    }
    getData();
  }, []);
  const getData = () => {
    call_get_api("front_data").then(
      (resolve: any) => {
        if (resolve.status === true) {
          setBrandLogo(resolve.data);
          setPageLoaded(true);
        } else {
          setPageLoaded(true);
        }
      },
      (reject) => {
        setPageLoaded(true);
      }
    );
  };
  return (
    <React.Fragment>
      <IonPage>
        <IonContent fullscreen className="bg-img" scrollY={false}>
          <div className="page-vertical">
            <div>
              <IonImg className="logo" src={logo} />
            </div>
            {brandLogo && (
              <div className="brandLogoImage">
                <IonRow>
                  {brandLogo.map((item, index) => {
                    return (
                      <IonCol size="6" key={index}>
                        <div className="ionimage">
                          <IonImg src={item} alt="img"></IonImg>
                        </div>
                      </IonCol>
                    );
                  })}
                </IonRow>
              </div>
            )}
            {!pageLoaded ? (
              <div>
                <IonSpinner name="lines-small"></IonSpinner>
              </div>
            ) : (
              <div>
                <IonRouterLink routerLink="/login">
                  <IonCol size="11">
                    <IonButton className="btnhome" expand="block">
                      Login&rarr;
                    </IonButton>
                  </IonCol>
                </IonRouterLink>
              </div>
            )}
          </div>
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default Home;
