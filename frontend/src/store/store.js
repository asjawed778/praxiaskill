import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use sessionStorage if needed

// Importing Reducers
import adminCategoryReducer from "./reducers/adminCategoryReducer";
import authReducer from "./reducers/authReducer";
import coursesReducer from "./reducers/coursesReducer";
import sidebarReducer from "../store/reducers/sidebarSlice"
import splashScreenReducer from "./reducers/splashScreenReducer";
// import noteReducer from "./reducers/notesSlice"

// Importing Apis
import { apiAuth } from "../services/auth.api";
import { apiCourse } from "../services/course.api";
import { paymentApi } from "../services/payment.api";
import { contactApi } from "../services/contactApi"
import { usersApi } from "../services/usersApi";
import { qnaApi } from "../services/qnaApi";
import { generalApi } from "../services/generalApi";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Combine all the reducers
const rootReducer = combineReducers({
  auth: authReducer,
  categories: adminCategoryReducer,
  courses: coursesReducer,
  sidebar: sidebarReducer,
  splashScreen: splashScreenReducer,
  // notes: notesReducer,

  [apiAuth.reducerPath]: apiAuth.reducer,
  [apiCourse.reducerPath]: apiCourse.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [qnaApi.reducerPath]: qnaApi.reducer,
  [generalApi.reducerPath]: generalApi.reducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      apiAuth.middleware,
      apiCourse.middleware,
      paymentApi.middleware,
      contactApi.middleware,
      usersApi.middleware,
      qnaApi.middleware,
      generalApi.middleware,
    ),
});

// Create the persisted store
export const persistor = persistStore(store);
