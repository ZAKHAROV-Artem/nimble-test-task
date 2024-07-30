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
  tagTypes: ["contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query<{ resources: Contact[] }, void>({
      query: () => "/contacts?sort=created:desc&record_type=person",
      providesTags: (result) =>
        result
          ? [
              ...result.resources.map(
                ({ id }) => ({ type: "contacts", id }) as const,
              ),
              { type: "contacts", id: "LIST" },
            ]
          : [{ type: "contacts", id: "LIST" }],
    }),
    addContact: builder.mutation<void, Partial<Contact>>({
      query: (newContact) => ({
        url: "contact",
        method: "POST",
        body: newContact,
      }),
      invalidatesTags: [{ type: "contacts", id: "LIST" }],
    }),
  }),
});

export const { useGetContactsQuery, useAddContactMutation } = contactsApi;
