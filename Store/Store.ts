import {configureStore} from "@reduxjs/toolkit";
import CustomerSlice from "../Reducers/CustomerSlice";
import ItemSlice from "../Reducers/ItemSlice";

export const store = configureStore({
    reducer:{
        customers:CustomerSlice,
        items:ItemSlice,
    }
});
export type AppDispatch = typeof store.dispatch;