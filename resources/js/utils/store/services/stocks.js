import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const stocksApi = createApi({
    reducerPath: "stocksApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.MIX_API_URL}/api/` }),
    endpoints: (builder) => ({
        getStocks: builder.query({
            query: () => {
                return {
                    url: "polygon-stocks",
                };
            },
        }),
        getStockLastQuote: builder.query({
            query: (tickers) => {
                return {
                    url: "last-quotes",
                    params: {
                        tickers: JSON.stringify(tickers),
                    },
                };
            },
        }),
        getStocksBySearch: builder.mutation({
            query: (search) => ({
                url: "polygon-stocks",
                method: "GET",
                params: {
                    search: search,
                },
            }),
        }),
        getStocksByLastId: builder.mutation({
            query: (lastId) => ({
                url: "polygon-stocks",
                method: "GET",
                params: {
                    lastId: lastId,
                },
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetStocksQuery,
    useGetStockLastQuoteQuery,
    useGetStocksBySearchMutation,
    useGetStocksByLastIdMutation,
} = stocksApi;
