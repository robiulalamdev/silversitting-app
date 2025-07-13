import { api } from "@/redux/api/api";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConversationTwoUsers: builder.query({
      query: ({ firstUserId, secondUserId }) =>
        `/conversation/users/${firstUserId}/${secondUserId}`,
    }),
    getConversationByUser: builder.query({
      query: (userId) => `/conversation/${userId}`,
    }),
    addConversation: builder.mutation({
      queryFn: async (data, queryApi, extraOptions, baseQuery) => {
        console.log("addConversation called with data:", data);

        // Check if conversation already exists
        const existingConversation = await baseQuery(
          `/conversation/users/${data.senderId}/${data.receiverId}`
        );
        console.log("Existing conversation response:", existingConversation);

        if (existingConversation.data) {
          // Return the existing conversation
          console.log(
            "Conversation already exists, returning existing conversation"
          );
          return { data: existingConversation.data };
        } else {
          // Create a new conversation
          console.log("Creating new conversation");
          const result = await baseQuery({
            url: "/conversation/add",
            method: "POST",
            body: data,
          });
          console.log("New conversation created with result:", result);
          return result;
        }
      },
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
} = chatApi;
