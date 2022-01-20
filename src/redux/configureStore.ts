import { createStore } from "redux";
import { setUserReducer } from "./reducers/setUserReducer";


// in large application the configureStore function is used to combine a lot of reducers into one function 
// which creates a store for all the reducers to dispact to.
export const configureStore = () => createStore(setUserReducer);