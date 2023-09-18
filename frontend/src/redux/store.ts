import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { userSlice } from './slices/users'

const persistConfig = {
    key: "cwkey",
    version: 1,
    storage,
    blacklist: ['loading', 'list', 'dialogConfig']
}

const reducer = combineReducers({
    users: userSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store;