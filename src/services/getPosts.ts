import { Post } from '../types';
import { httpClient } from './httpClient';

export const getPosts = () => {
  return httpClient.get<Post[]>('/posts');
};
