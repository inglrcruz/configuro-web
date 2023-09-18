import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { userSlice } from './slices/users'

const persistConfig = {
    key: "cwmkey",
    version: 1,
    storage: AsyncStorage,
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