import { combineReducers } from "redux";
import AuthReducer from "./auth/reducer";
import dashboardReducer from "./dashboard/reducer";
import inventoryReducer from "./inventory/reducer";
import profilReducer from "./profil/reducer";
import accountReducer from "./account/reducers";

const rootReducer = combineReducers({
    auth: AuthReducer,
    book: dashboardReducer,
    inventory: inventoryReducer,
    profil: profilReducer,
    account: accountReducer,
})

export default rootReducer;