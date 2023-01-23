import { httpClient } from './httpClient';

export const getCommentsByPostId = (postId: string) => {
  return httpClient.get('/comments', { params: { postId } });
};
