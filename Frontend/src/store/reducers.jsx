import { combineReducers } from "redux";
import AuthReducer from "./auth/reducer";
import dashboardReducer from "./dashboard/reducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    book: dashboardReducer,
})

export default rootReducer;