import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: [],
    totalBlogs: 0,
    currentBlog: null,
    relatedBlogs: [],
    loading: false,
    error: null,
};

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload.blogs;
            state.totalBlogs = action.payload.total;
            state.loading = false;
            state.error = null;
        },
        setCurrentBlog: (state, action) => {
            state.currentBlog = action.payload.blog;
            state.relatedBlogs = action.payload.relatedBlogs || [];
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setBlogs, setCurrentBlog, setLoading, setError } = blogSlice.actions;
export default blogSlice.reducer;
