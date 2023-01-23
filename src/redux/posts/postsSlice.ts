import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { getPosts } from '../../services/getPosts';
import { Post } from '../../types';

export interface PostsState {
  data: Post[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  data: [],
  status: 'idle',
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (searchTerm?: string) => {
  const response = await getPosts();
  if (searchTerm) {
    return response.data.filter((post) => post.title.includes(searchTerm));
  }
  return response.data.slice(0, 10);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { incrementByAmount } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
