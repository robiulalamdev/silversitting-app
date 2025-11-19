import { USER_CONFIG } from "@/config";
import { api } from "@/redux/api/api";
import { setUser } from "./userSlice";

const usersApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    register: builder.mutation({
      query: (data: any) => {
        //console.log('Register mutation data:', data); // Logge die gesendeten Daten
        return {
          url: "/users/signup",
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Setze den Content-Type-Header
          },
          body: data,
        };
      },
    }),

    login: builder.mutation({
      query: (data: any) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        try {
          const result = await queryFulfilled;

          await USER_CONFIG.SAVE_TO_STORAGE(
            USER_CONFIG.TOKEN_NAME,
            result.data.accessToken
          );
          if (result.data.user) {
            dispatch(
              setUser({
                _id: result.data.user._id,
                role: result.data.user.role,
                firstName: result.data.user.firstName,
                lastName: result.data.user.lastName,
                email: result.data.user.email,
                isVerified: result.data.user.isVerified,
                residance: result.data.user.residance,
              })
            );
          }
        } catch (error) {}
      },
    }),
    getSingleUser: builder.query({
      query: (id: any) => `/users/${id}`,
      providesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: ({ id, editData }: any) => ({
        url: `/users/edit/${id}`,
        method: "PUT",
        body: editData,
      }),
      invalidatesTags: ["User"],
    }),
    uploadDocument: builder.mutation({
      query: ({ id, data }: any) => ({
        // url: `/users/upload/${id}`,
        url: `/upload`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      }),
    }),
    sendResendEmail: builder.mutation({
      query: (data: any) => ({
        url: `/users/resendEmail`,
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data: any) => ({
        url: `/users/changePassword`,
        method: "PUT",
        body: data,
      }),
    }),
    changeSearchStatus: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/users/searchStatus/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    changeVolunteerStatus: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/users/volunteerStatus/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: any) => ({
        url: "/users/resetPasswordEmail",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data: any) => ({
        url: "/users/forgotPassword",
        method: "POST",
        body: data,
      }),
    }),

    passwordReset: builder.mutation({
      query: ({ data }: any) => ({
        url: `/users/reset-password`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["users"],
    }),
  }),
});

export const {
  //  useGetAllUsersQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetSingleUserQuery,
  useEditUserMutation,
  useUploadDocumentMutation,
  useSendResendEmailMutation,
  // useDeleteUserMutation,
  useChangePasswordMutation,
  useChangeSearchStatusMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useChangeVolunteerStatusMutation,

  // for reset password
  usePasswordResetMutation,
} = usersApi;
