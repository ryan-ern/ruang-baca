import { combineReducers } from "redux";
import AuthReducer from "./auth/reducer";
import dashboardReducer from "./dashboard/reducer";
import inventoryReducer from "./inventory/reducer";
import profilReducer from "./profil/reducer";
import accountReducer from "./account/reducers";
import borrowReducer from "./borrow/reducer";
import returnReducer from "./return/reducers";
import finedReducer from "./fined/reducers";
import majorReducer from "./major/reducers";
import searchReducer from "./search/reducers";
import presentReducer from "./present/reducers";

const rootReducer = combineReducers({
    auth: AuthReducer,
    book: dashboardReducer,
    inventory: inventoryReducer,
    profil: profilReducer,
    account: accountReducer,
    borrow: borrowReducer,
    return: returnReducer,
    fined: finedReducer,
    major: majorReducer,
    search: searchReducer,
    present: presentReducer
})

export default rootReducer;