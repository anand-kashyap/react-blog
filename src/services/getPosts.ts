import { httpClient } from './httpClient';

export const getPosts = () => {
  return httpClient.get('/posts');
};
