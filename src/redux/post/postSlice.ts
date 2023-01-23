import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostById } from '../../services/getPostsById';
import type { Post } from '../../types';
import { RootState } from '../store';

export interface PostState {
  data: Post | {};
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostState = {
  data: {},
  status: 'idle',
};

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId: string) => {
  const response = await getPostById(postId);
  return response.data;
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchPostById.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectPost = (state: RootState) => state.post;

export default postSlice.reducer;
