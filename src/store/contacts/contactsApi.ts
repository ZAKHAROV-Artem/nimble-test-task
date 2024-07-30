import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Contact } from "../../types/contacts";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  }),
  endpoints: (builder) => ({
    getContacts: builder.query<{ resources: Contact[] }, void>({
      query: () => "/contacts?record_type=person",
    }),
  }),
});

export const { useGetContactsQuery } = contactsApi;
