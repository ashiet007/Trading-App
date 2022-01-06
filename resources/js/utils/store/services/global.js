import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const globalApi = createApi({
    reducerPath: "globalApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.MIX_API_URL}/api/` }),
    endpoints: (builder) => ({
        getMarketStatus: builder.query({
            query: () => `market-status`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMarketStatusQuery } = globalApi;
