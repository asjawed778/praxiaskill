import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use sessionStorage if needed

// Importing Reducers
import adminCategoryReducer from "./reducers/adminCategoryReducer";
import authReducer from "./reducers/authReducer";
import coursesReducer from "./reducers/coursesReducer";


// Importing Apis
import { apiAuth } from "../services/auth.api";
import { apiCourse } from "../services/course.api";
import { paymentApi } from "../services/payment.api";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist only the auth slice
};

// Combine all the reducers
const rootReducer = combineReducers({
  auth: authReducer,
  categories: adminCategoryReducer,
  courses: coursesReducer,
  [apiAuth.reducerPath]: apiAuth.reducer,
  [apiCourse.reducerPath]: apiCourse.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
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
    ),
});

// Create the persisted store
export const persistor = persistStore(store);
