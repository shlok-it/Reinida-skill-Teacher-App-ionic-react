import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
const Logout = () => {
    secureLocalStorage.removeItem("app_authenticated");
    secureLocalStorage.removeItem("app_access_token");
    return <Navigate replace to="/login" />;
};
export default Logout