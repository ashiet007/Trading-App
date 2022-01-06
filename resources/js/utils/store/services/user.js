import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.MIX_API_URL}/api/` }),
    endpoints: (builder) => ({
        getWallet: builder.query({
            query: () => {
                return {
                    url: "wallet",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        Accept: "application/json",
                    },
                    method: "GET",
                };
            },
        }),
        login: builder.mutation({
            query: (formData) => ({
                url: "login",
                method: "POST",
                body: formData,
            }),
        }),
        register: builder.mutation({
            query: (formData) => ({
                url: "register",
                method: "POST",
                body: formData,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
                },
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetWalletQuery,
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
} = userApi;
