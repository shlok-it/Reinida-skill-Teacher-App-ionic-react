import { combineReducers } from "redux";

// Front
import LayoutReducer from "./reducer";
const rootReducer = combineReducers({
    User: LayoutReducer
});

export default rootReducer;