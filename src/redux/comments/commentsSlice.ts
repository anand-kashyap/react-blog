import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCommentsByPostId } from '../../services/getCommentsByPostId';
import { Comment, PromiseResp } from '../../types';
import { RootState } from '../store';

export interface CommentsState {
  data: Comment[];
  status: PromiseResp;
}

const initialState: CommentsState = {
  data: [],
  status: 'idle',
};

export const fetchCommentsByPostId = createAsyncThunk('posts/fetchCommentsByPostId', async (postId: string) => {
  const response = await getCommentsByPostId(postId);
  return response.data;
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments(state) {
      state.data = [];
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchCommentsByPostId.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export const selectComments = (state: RootState) => state.comments;

export default commentsSlice.reducer;
