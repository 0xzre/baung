import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";
import { tokenMiddleware } from "../middlewares/tokenMiddleware";
import { initializeAuth } from "./actions/authActions";

const createAppStore = async (navigate) => {
  try {
    const store = configureStore({
      reducer: rootReducer,
      // middleware: [thunk, tokenMiddleware],
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMiddleware)
    });

    await store.dispatch(initializeAuth(navigate));

    return store;
  } catch (err) {
    throw new Error("Some error occurred");
  }
};

export default createAppStore;
