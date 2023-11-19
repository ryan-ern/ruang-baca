import { combineReducers } from "redux";
import AuthReducer from "./auth/reducer";
import dashboardReducer from "./dashboard/reducer";
import inventoryReducer from "./inventory/reducer";
import profilReducer from "./profil/reducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    book: dashboardReducer,
    inventory: inventoryReducer,
    profil: profilReducer,
})

export default rootReducer;