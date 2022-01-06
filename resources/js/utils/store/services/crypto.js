import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.MIX_API_URL}/api/` }),
    endpoints: (builder) => ({
        getCryptocurrencies: builder.query({
            query: () => `cryptocurrencies`,
        }),
        getTickInfo: builder.query({
            query: (symbol) => {
                return {
                    url: "symbol-informations",
                    params: {
                        symbol,
                    },
                };
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCryptocurrenciesQuery, useGetTickInfoQuery } = cryptoApi;
