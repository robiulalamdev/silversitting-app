import { api } from "@/redux/api/api";

export const blogApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    createBlog: builder.mutation({
      query: (data: any) => ({
        url: "/blogs",
        method: "POST",
        body: data,
      }),
    }),
    getAllBlogs: builder.query({
      query: () => "/blogs/all",
      providesTags: ["Blogs"],
    }),
    getBlogById: builder.query({
      query: (blogID: any) => `/blogs/${blogID}`,
      providesTags: ["BlogDetails"],
    }),
    updateBlog: builder.mutation({
      query: ({ blogID, data }: any) => ({
        url: `/blogs/${blogID}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Blogs", "BlogDetails"],
    }),
    deleteBlog: builder.mutation({
      query: (blogID: any) => ({
        url: `/blogs/${blogID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
