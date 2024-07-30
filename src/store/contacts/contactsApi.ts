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
  tagTypes: ["contacts", "contact"],
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
    getContact: builder.query<Contact, string>({
      query: (id) => `contact/${id}`,
      providesTags: (result, error, id) => [{ type: "contact", id }],
      transformResponse: (response: { resources: Contact[] }) =>
        response.resources[0],
    }),
    addContact: builder.mutation<void, Partial<Contact>>({
      query: (newContact) => ({
        url: "/contact",
        method: "POST",
        body: newContact,
      }),
      invalidatesTags: [{ type: "contact", id: "LIST" }],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "contact", id },
        { type: "contacts", id: "LIST" },
      ],
    }),
    addTags: builder.mutation<void, { id: string; tags: string[] }>({
      query: ({ id, tags }) => ({
        url: `/contacts/${id}/tags`,
        method: "PUT",
        body: { tags },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "contact", id }],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useAddTagsMutation,
} = contactsApi;
