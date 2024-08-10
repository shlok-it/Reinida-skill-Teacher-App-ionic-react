import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  calendarOutline,
  gridOutline,
  homeOutline,
  listCircleOutline,
  newspaper,
  newspaperOutline,
  personOutline,
  receiptOutline,
} from "ionicons/icons";
import Layout from "../../Layout";
import Profile from "../../pages/profile";
import Attendace from "../attendence/Attendace";
import Dashboard from "../dashboard";
import MenuList from "../MenuList";
import Salary from "../salary";
import Report from "../report";
import "./tabs.scss";
const Tabs: React.FC = () => (
    <IonTabs className="tab-bs">
      <IonRouterOutlet>
        <Route exact path="/tabs/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/tabs/attendace">
          <Attendace />
        </Route>
        <Route exact path="/tabs/menu">
          <MenuList />
        </Route>
        <Route exact path="/tabs/salary">
          <Salary />
        </Route>
        <Route exact path="/tabs/report">
          <Report />
        </Route>
        <Route exact path="/tabs/profile">
          <Profile />
        </Route>
        <Route exact path="/">
          <Redirect to="/tabs/dashboard" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom" translucent={true}>
        <IonTabButton tab="tabs/dashboard" href="/tabs/dashboard">
          <IonIcon
            aria-hidden="true"
            icon={homeOutline}
            style={{ fontSize: "26px" }}
          />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton
          tab="tabs/attendace"
          href="/tabs/attendace"
          className="comments"
        >
          <IonIcon aria-hidden="true" icon={listCircleOutline} />
          <IonLabel>Attendece</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tabs/salary" href="/tabs/salary">
          <IonIcon aria-hidden="true" icon={calendarOutline} />
          <IonLabel>Salary</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tabs/report" href="/tabs/report">
          <IonIcon aria-hidden="true" icon={receiptOutline} />
          <IonLabel>Report</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tabs/profile" href="/tabs/profile">
          <IonIcon
            aria-hidden="true"
            icon={personOutline}
            style={{ fontSize: "26px" }}
          />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
);
export default Tabs;
