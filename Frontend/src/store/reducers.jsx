import { combineReducers } from "redux";
import AuthReducer from "./auth/reducer";
import dashboardReducer from "./dashboard/reducer";
import inventoryReducer from "./inventory/reducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    book: dashboardReducer,
    inventory: inventoryReducer,
})

export default rootReducer;