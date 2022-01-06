import { configureStore } from "@reduxjs/toolkit";
import tickerReducer from "./slice/tickerSlice";
import dealReducer from "./slice/dealSlice";
import userReducer from "./slice/userSlice";
import stocksReducer from "./slice/stocksSlice";
import commonReducer from "./slice/commonSlice";
import { cryptoApi } from "./services/crypto";
import { dealApi } from "./services/deal";
import { userApi } from "./services/user";
import { globalApi } from "./services/global";
import { stocksApi } from "./services/stocks";
import forexReducer from "./slice/forexSlice";
import { forexApi } from "./services/forex";

export const store = configureStore({
    reducer: {
        ticker: tickerReducer,
        deal: dealReducer,
        user: userReducer,
        stocks: stocksReducer,
        forex: forexReducer,
        common: commonReducer,
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [dealApi.reducerPath]: dealApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [globalApi.reducerPath]: globalApi.reducer,
        [stocksApi.reducerPath]: stocksApi.reducer,
        [forexApi.reducerPath]: forexApi.reducer,
    },

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            cryptoApi.middleware,
            userApi.middleware,
            dealApi.middleware,
            globalApi.middleware,
            stocksApi.middleware,
            forexApi.middleware
        ),
});

export default store;
