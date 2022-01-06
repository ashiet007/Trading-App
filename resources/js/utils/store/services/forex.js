import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const forexApi = createApi({
    reducerPath: "forexApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.MIX_API_URL}/api/` }),
    endpoints: (builder) => ({
        getForexes: builder.query({
            query: () => {
                return {
                    url: "polygon-forex",
                };
            },
        }),
        getForexLastQuote: builder.query({
            query: (tickers) => {
                return {
                    url: "last-forex-quotes",
                    params: {
                        tickers: JSON.stringify(tickers),
                    },
                };
            },
        }),
        getForexesBySearch: builder.mutation({
            query: (search) => ({
                url: "polygon-forex",
                method: "GET",
                params: {
                    search: search,
                },
            }),
        }),
        getForexesByLastId: builder.mutation({
            query: (lastId) => ({
                url: "polygon-forex",
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
    useGetForexesQuery,
    useGetForexLastQuoteQuery,
    useGetForexesBySearchMutation,
    useGetForexesByLastIdMutation,
} = forexApi;
