import { api } from "@/redux/api/api";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConversationTwoUsers: builder.query({
      query: ({ firstUserId, secondUserId }) =>
        `/conversation/users/${firstUserId}/${secondUserId}`,
    }),
    getConversationByUser: builder.query({
      query: (userId) => `/conversation/${userId}`,
      providesTags: ["Messages", "chats"],
    }),
    getUnreadStatus: builder.query({
      query: (userId) => `/conversation/unread-status/${userId}`,
      providesTags: ["Messages", "chats"],
    }),
    addConversation: builder.mutation({
      queryFn: async (data, queryApi, extraOptions, baseQuery) => {
        // Check if conversation already exists
        const existingConversation = await baseQuery(
          `/conversation/users/${data.senderId}/${data.receiverId}`
        );

        if (existingConversation.data) {
          // Return the existing conversation

          return { data: existingConversation.data };
        } else {
          // Create a new conversation
          const result = await baseQuery({
            url: "/conversation/add",
            method: "POST",
            body: data,
          });
          return result;
        }
      },
      invalidatesTags: ["Messages"],
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: "/message/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Messages"],
    }),
    getMessageByConversation: builder.query({
      query: (conversationId) => `/message/${conversationId}`,
      providesTags: ["Messages"],
    }),
    putMessageSeen: builder.mutation({
      query: ({ senderId, conversationId }) => ({
        url: `/message/seen/${senderId}/${conversationId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Messages", "chats"],
    }),
  }),
});

export const {
  useGetConversationTwoUsersQuery,
  useGetConversationByUserQuery,
  useAddConversationMutation,
  useAddMessageMutation,
  useGetMessageByConversationQuery,
  usePutMessageSeenMutation,
  useGetUnreadStatusQuery,
} = chatApi;
