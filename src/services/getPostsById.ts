import { httpClient } from './httpClient';

export const getPostById = (postId: string) => {
  return httpClient.get(`/posts/${postId}`);
};
