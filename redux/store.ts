import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './features/accountSlice';
import onboardingReducer from './features/onBoardingSlice';
import reportReducer from './features/reportSlice';
import cartReducer from './features/cartSlice';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseApi } from './api/baseApi';

const accountPersistConfig = {
    key: 'account',
    storage: AsyncStorage,
};
const accountPersistReducer = persistReducer(accountPersistConfig, accountReducer);

export const store = configureStore({
    reducer: {
        // account
        account: accountPersistReducer,
        // onboarding
        onboarding: onboardingReducer,
        // report
        report: reportReducer,
        // cart
        carts: cartReducer,
        // api
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
