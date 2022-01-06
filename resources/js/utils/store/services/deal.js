import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const dealApi = createApi({
    reducerPath: "dealApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.MIX_API_URL}/api/` }),
    tagTypes: ["Deal"],
    endpoints: (builder) => ({
        getAllDeals: builder.query({
            query: () => {
                return {
                    url: "all-deals",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        Accept: "application/json",
                    },
                    method: "GET",
                };
            },
            providesTags: ["Deal"],
        }),
        openDeal: builder.mutation({
            query: (formData) => ({
                url: "open-deal",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
                },
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Deal"],
        }),
        closeDeal: builder.mutation({
            query: (formData) => ({
                url: "close-deal",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
                },
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Deal"],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllDealsQuery,
    useOpenDealMutation,
    useCloseDealMutation,
} = dealApi;
