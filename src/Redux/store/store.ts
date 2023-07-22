import { useDispatch } from "react-redux"
import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux"
import ThunkMiddleware from "redux-thunk"
import postReducer from "./postReducer"

const rootReducers = combineReducers({
  postReducer,
})

export const store = createStore(rootReducers, applyMiddleware(ThunkMiddleware))

export type TAppState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
