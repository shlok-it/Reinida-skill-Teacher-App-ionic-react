import { IonRouterOutlet, useIonViewWillEnter } from "@ionic/react";
import Tabs from "../pages/tabs/Tabs";
import PaymentForm from "../pages/kyc/PaymentForm";
import ChangePassword from "../pages/profile/ChangePassword";
import KycForm from "../pages/kyc/KycForm";
import PersonalInformation from "../pages/profile/PersonalInformation";
import DocumentDetail from "../pages/profile/DocumentDetail";
import { Route } from "react-router";
import UserReport from "../pages/UserReport";
import UserService from "../pages/UserService";
import { useDispatch } from "react-redux";
import { useStateContext } from "../contexts/ContextProvider";
import TermsCondition from "../pages/TermsCondition";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Login from "../auth/Login";
import { IonReactRouter } from "@ionic/react-router";
import Home from "../pages/home/Home";
import Layout from "../Layout";
import LeaveList from "../pages/leave";
import SurveryList from "../pages/survey";
import SurveryAdd from "../pages/survey/Add";
import Support from "../pages/support/index";
import { useEffect } from "react";
import Notifications from "../pages/notification";
const Routes: React.FC = (props) => {
  const { toast, isAuthed, setIsAuthed } =useStateContext();
   const authProtectedRoutes = [
    { path: "/", exact: true, component: <Tabs /> },
    { path: "/tabs/", exact: true, component: <Tabs /> },
    { path: "/tabs/:id", exact: true, component: <Tabs /> },
    { path: "/leave-list", exact: true, component: <LeaveList /> },
    { path: "/notification", exact: true, component: <Notifications /> },
    { path: "/change-password", exact: true, component: <ChangePassword /> },
    { path: "/help-and-support", exact: true, component: <Support /> },
    // { path: "/payment-form", exact: true, component: <PaymentForm /> },
    // { path: "/kyc-form", exact: true, component: <KycForm /> },
    {
      path: "/personal-information",
      exact: true,
      component: <PersonalInformation />,
    },
    // { path: "/document-detail", exact: true, component: <DocumentDetail /> },
    // { path: "/report", exact: true, component: <UserReport /> },
    // { path: "/service", exact: true, component: <UserService /> },
    { path: "/survery", exact: true, component: <SurveryList /> },
    { path: "/survery/add", exact: true, component: <SurveryAdd /> },
   
  ];
  const publicRoutes = [
    // { path: "/", exact: true, component: <Home /> },
    { path: "/home", exact: true, component: <Home /> },
    { path: "/temrs-condition", exact: true, component: <TermsCondition /> },
    { path: "/privacy-policy", exact: true, component: <PrivacyPolicy /> },
    { path: "/login", exact: true, component: <Login /> },
  ];

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            key={idx}
            exact={true}
            render={() => route.component}
          />
        ))}
        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            key={idx}
            exact={true}
            render={() => isAuthed?<Layout>{route.component}</Layout>:<Login />}
          />
        ))}
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routes;
