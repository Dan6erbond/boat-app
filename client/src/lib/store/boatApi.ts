import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Boat } from "../../types/Boat";

export const boatApi = createApi({
  reducerPath: "boats",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/boats",
    prepareHeaders: (headers, { getState }: any) => {
      headers.set("Authorization", `Bearer ${getState().user.accessToken}`);
      return headers;
    },
  }),
  tagTypes: ["Boat"],
  endpoints: (builder) => ({
    createBoat: builder.mutation<Boat, Omit<Boat, "id">>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Boat", id: "LIST" }],
    }),
    getBoats: builder.query<Boat[], void>({
      query: () => "",
      transformResponse: (response: { _embedded: { boats: Boat[] } }) =>
        response._embedded.boats,
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Boat", id } as const)),
              { type: "Boat", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Boat', id: 'LIST' }` is invalidated
            [{ type: "Boat", id: "LIST" }],
    }),
    getBoatById: builder.query<Boat, { id: number }>({
      query: ({ id }) => `/${id}`,
      providesTags: (result) =>
        result ? [{ type: "Boat", id: result.id }] : [],
    }),
    updateBoat: builder.mutation<Boat, Partial<Boat> & Pick<Boat, "id">>({
      query: ({ id, ...put }) => ({
        url: `/${id}`,
        method: "PUT",
        body: put,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Boat", id }],
    }),
    deleteBoat: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Boat", id }],
    }),
  }),
});

export const {
  useCreateBoatMutation,
  useGetBoatsQuery,
  useGetBoatByIdQuery,
  useUpdateBoatMutation,
  useDeleteBoatMutation,
} = boatApi;
