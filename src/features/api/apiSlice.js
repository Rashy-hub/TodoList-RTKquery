import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Votre token d'authentification
const token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTJiZjJkNjM2ZTFiOTY5NmUzYWNjYiIsInBzZXVkbyI6InNsb2FuZSIsImlhdCI6MTcyMzQ2OTI1OSwiZXhwIjoxNzU1MDI2ODU5LCJhdWQiOiJkZWZhdWx0X2F1ZGllbmNlIiwiaXNzIjoiZGVmYXVsdF9pc3N1ZXIifQ.NNElrM_0v1AWm_WRRzJptxSfGxlMy3wS3s_yC8_Fpbeg1OVwkft5RsfCv2arEI7_DShITWmpTCzH4m1z7VUbFA";

// Define your API slice
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://todo-list-demo.onrender.com/api",
        prepareHeaders: (headers) => {
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => "/todo",
            transformResponse: (res) => res.todos || [],
            providesTags: ["Todos"],
        }),
        getTodoById: builder.query({
            query: (id) => `/todo/${id}`, // Updated endpoint
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: "/todo/add",
                method: "POST",
                body: todo,
            }),
            invalidatesTags: ["Todos"],
        }),
        completeTodo: builder.mutation({
            query: (todo) => ({
                url: `/todo/complete/${todo._id}`,
                method: "POST",
                body: todo,
            }),
            invalidatesTags: ["Todos"],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todo/delete/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Todos"],
        }),
        clearTodo: builder.mutation({
            query: () => ({
                url: "/todo/clear",
                method: "POST",
            }),
            invalidatesTags: ["Todos"],
        }),
    }),
});

export const {
    useGetTodosQuery,
    useGetTodoByIdQuery, // Ensure this is exported
    useAddTodoMutation,
    useCompleteTodoMutation,
    useDeleteTodoMutation,
    useClearTodoMutation,
} = apiSlice;

/*import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import utils from '../data/utils.json'

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: utils.geoapi.base }),
    endpoints: (builder) => ({
        getWeatherByCity: builder.mutation({
            query: (city) => ({
                url: 'direct',
                method: 'GET',
                params: { q: city, limit: 1, appid: utils.geoapi.key },
            }),
        }),
    }),
})

export const { useGetWeatherByCityMutation } = weatherApi
 */

/*todoRouter.get('/todo', authentificateJwt(), todoController.getTodos)
todoRouter.post('/todo/add', authentificateJwt(), todoController.addTodo)
todoRouter.post('/todo/complete/:id', authentificateJwt(), todoController.completeTodo)
todoRouter.post('/todo/delete/:id', authentificateJwt(), todoController.deleteTodo)
todoRouter.post('/todo/clear', authentificateJwt(), todoController.clearTodo) */
