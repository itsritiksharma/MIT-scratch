import { configureStore, combineReducers } from "@reduxjs/toolkit";
import characterReducer from "./characterSlice";
import widgetReducer from './widgetsSlice';

const conmbinedReducers = combineReducers({
  characters: characterReducer,
  widgets: widgetReducer
})

export const store = configureStore({
  reducer: conmbinedReducers,
});

export type RootState = ReturnType<typeof conmbinedReducers>;

export type AppDispatch = typeof store.dispatch;
export default store;
