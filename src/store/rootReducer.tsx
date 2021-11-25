import { combineReducers } from "redux"
import cartReducer from "../Containers/Products/redux/cartReducer"

const rootReducer = combineReducers({
    cart: cartReducer
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>;
